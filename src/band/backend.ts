import { invoke } from "@tauri-apps/api/core";
import { ErrorKind, Credentials, NetworkInfo } from "../models/models";

const getNetworks = async (intr: string): Promise<NetworkInfo[]> => {
	const items = (await invoke("networks", {
		intr: intr,
	}).catch((err: ErrorKind) => {
		alert(err.kind + "\n" + err.message);
	})) as NetworkInfo[];
	return items;
};
export const connect = async (
	ssid: string,
	password: string,
	intr: string,
	saved: boolean
): Promise<string> => {
	const result = (await invoke("connect", {
		ssid: ssid,
		password: password,
		interface: intr,
		saved: saved,
	}).catch((err: ErrorKind) => {
		alert(err.kind + "\n" + err.message);
	})) as string;
	return result;
};

export const forget = async (ssid: string): Promise<string> => {
	const result = (await invoke("forget", {
		ssid: ssid,
	}).catch((err: ErrorKind) => {
		alert(err.kind + "\n" + err.message);
	})) as string;
	return result;
};

export default getNetworks;
