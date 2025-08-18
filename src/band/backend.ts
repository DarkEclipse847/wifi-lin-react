import { invoke } from "@tauri-apps/api/core";
import { NetworkInfo } from "../models/models";

const getNetworks = async (intr: string): Promise<NetworkInfo[]> => {
    const items = (await invoke("networks", {
        intr: intr
    })) as NetworkInfo[];
    return items;
}

export default getNetworks;