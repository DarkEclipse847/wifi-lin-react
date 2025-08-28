import { invoke } from "@tauri-apps/api/core";
import { Credentials, NetworkInfo } from "../models/models";

const getNetworks = async (intr: string): Promise<NetworkInfo[]> => {
    const items = (await invoke("networks", {
        intr: intr
    })) as NetworkInfo[];
    return items;
}
export const connect = async(ssid: string, password: string, intr: string, saved: boolean): Promise<string> => {
    const result = (await invoke("connect", {
        ssid: ssid,
        password: password,
        interface: intr,
        saved: saved
    })) as string;
    return result;
}

export default getNetworks;