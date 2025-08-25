//struct NetworkInfo{
//    bssid: String,
//    ssid: String,
//    strength: String,
//    security: String,
//    in_use: bool,
//    saved: bool
//}

export interface NetworkInfo{
    bssid: string,
    ssid: string,
    strength: string,
    security: string,
    inUse: boolean,
    saved: boolean
}

export interface Credentials{
    ssid: string,
    password: string,
    interface: string,
}