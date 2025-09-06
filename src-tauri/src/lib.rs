use std::process::{Command, Output};
use std::io::Error;
use serde::Serialize;
//Maybe [https://crates.io/crates/const-regex] to reduce resourse consumption
use regex::Regex;

//TODO: Add wrapper for ```nmcli radio wifi```

mod error_handling;

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
struct NetworkInfo{
    bssid: String,
    ssid: String,
    strength: String,
    security: String,
    interface: String,
    in_use: bool,
    saved: bool
}

//TODO: instead of manually creating this struct every time, it's better to implement .new() method

fn get_interface_list()-> Result<Vec<String>, error_handling::Error>{
    // `network_interface` crate does not provide device type,
    // so i've considered using nmcli directly, calling required command
    // and parsing the output
    let output = Command::new("nmcli")
        .args(&[
            "device",
            "status"
        ]).output()?;
    let mut ivec: Vec<String> = Vec::new();

    let rows: Vec<String> = String::from_utf8_lossy(&output.stdout)
        .split("\n")
        .map(|row| row.to_owned())
        .collect();
    for row in &rows{
        let items: Vec<String> = (*row)
            .split_whitespace()
            .map(|i| i.to_string())
            .collect();
        // nmcli uses offset(empty line) in terminal,
        // so we need to check if vec length is equal to zero
        if items.len()>0 && items[1] == "wifi".to_string(){
            ivec.push(items[0].to_string());
        } else {continue;};
    }
    Ok(ivec)
}

#[tauri::command]
fn interfaces() -> Result<Vec<String>, error_handling::Error> {
    let interfaces = get_interface_list()?;
    Ok(interfaces)
}

fn get_saved_networks()->Result<Vec<String>, error_handling::Error>{
    let re = Regex::new(r"\s\s+").unwrap();
    let mut snvec: Vec<String> = Vec::new();
    let output = Command::new("nmcli")
        .args(&[
            "connection",
            "show"
        ]).output()?;
    let rows: Vec<String> = String::from_utf8_lossy(&output.stdout)
        .split("\n")
        .map(|row| row.to_owned())
        .collect();
    for row in &rows{
        let items: Vec<String> = re.split(row)
            .map(|i| i.to_string())
            .collect();
        if items.len()>1 && items[2] == "wifi".to_string(){
            snvec.push(items[0].to_string());
        } else {
            continue;
        }
    }
    for item in &snvec{
        println!("{}", &item)
    }
    Ok(snvec)
}

fn get_networks(interface: String) -> Result<Vec<NetworkInfo>, error_handling::Error>{
    let re = Regex::new(r"\s\s+").unwrap();
    let saved_networks = get_saved_networks()?;
    let mut nvec: Vec<NetworkInfo> = Vec::new();
    let output = Command::new("nmcli")
        .args(&[
            "device",
            "wifi",
            "list",
            "ifname",
            &interface
        ]).output()?;
    let rows: Vec<String> = String::from_utf8_lossy(&output.stdout)
        .split("\n")
        .map(|row| row.to_owned())
        .collect();

    // Is `for` loop good for this situation?
    // i think it's been called every second or so....
    // Maybe just use event in react side to call this on choosing the interface
    // UPD: Okay this was just messy testing in react, this is called only one time
    for row in &rows{
        let items: Vec<String> = re.split(row)
            .map(|i| i.to_string())
            .collect();
        if items[0] == "*".to_string() {
            let new_net_info = NetworkInfo{
                bssid:      items[1].to_owned(), // MAC adress
                ssid:       items[2].to_owned(), // just a name
                strength:   items[6].to_owned(), // network strength in % (0-100)
                security:   items[8].to_owned(), // Wifi security protocols
                interface: interface.to_string(),
                in_use: true,
                saved: true
            };
            nvec.push(new_net_info);
        } else if items.len()>1 && (items[0] == "IN-USE".to_string() || items[2] == "--".to_string()) {
            continue;
        } else if items.len()>1 && saved_networks.contains(&items[2]) {
             let new_net_info = NetworkInfo{
                bssid:      items[1].to_owned(), // MAC adress
                ssid:       items[2].to_owned(), // just a name
                strength:   items[6].to_owned(), // network strength in % (0-100)
                security:   items[8].to_owned(), // Wifi security protocols
                interface: interface.to_string(),
                in_use: false,
                saved: true
            };
            println!("{:?}", &new_net_info);
            nvec.push(new_net_info);

        //TODO: Fix this hardcoded shit(len sometimes 1 and sometimes zero for some reason while checking offset str)
        } else if items.len()>1{
            let new_net_info = NetworkInfo{
                bssid:      items[1].to_owned(), // MAC adress
                ssid:       items[2].to_owned(), // just a name
                strength:   items[6].to_owned(), // network strength in % (0-100)
                security:   items[8].to_owned(), // Wifi security protocols
                interface: interface.to_string(),
                in_use: false,
                saved: false
            };
            nvec.push(new_net_info);
        }
    }
    Ok(nvec)
}

#[tauri::command]
fn networks(intr: String) -> Vec<NetworkInfo> {
    let networks = get_networks(intr).expect("Error occured while getting networks list");
    return networks;
}

#[tauri::command]
fn connect(
    ssid: String,
    password: String,
    interface: String,
    saved: bool,
) -> Result<String, error_handling::Error> {
    let output: Output;
    // After adding logging system need to return some error to js
    // and change this unwrap
    // ^ Done!!!!
    if !saved{
        output = Command::new("nmcli")
            .args(&[
                "device",
                "wifi",
                "connect",
                &ssid,
                "password",
                &password,
                "ifname",
                &interface
            ]).output()?;
    } else {
        output = Command::new("nmcli")
            .args(&[
                "connection",
                "up",
                &ssid
            ]).output()?;
    }
    if String::from_utf8_lossy(&output.stdout).as_ref().contains("successfully activated") {
        Ok(format!("Successfully connected to {ssid}"))
    } else {
        Err(error_handling::Error::ConnectonErr(ssid))
    }
}

#[tauri::command]
fn forget(ssid: String) -> Result<String, error_handling::Error>{
    let output = Command::new("nmcli")
        .args(&[
            "connection",
            "delete",
            &ssid,
        ]).output()?;
    if String::from_utf8_lossy(&output.stdout).as_ref().contains("successfully deleted") {
        Ok(format!("Successfully disconnected from {ssid}"))
    } else {
        Err(error_handling::Error::DisconnectionErr(ssid))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![interfaces, networks, connect, forget])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
