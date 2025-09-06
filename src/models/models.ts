export interface NetworkInfo{
    bssid: string,
    ssid: string,
    strength: string,
    security: string,
    interface: string,
    inUse: boolean,
    saved: boolean
}

//Do i even need this one?
export interface Credentials{
    ssid: string,
    password: string,
    interface: string,
    saved: boolean
}

export type ErrorKind = {
    kind: 'io' | 'connectionErr' | 'disconnectionErr';
    message: string
}