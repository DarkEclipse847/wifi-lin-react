import { SetStateAction, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import NetworkList from "./components/NetworkList"
import InterfaceList from "./components/Interface";
import getNetworks from "./band/backend"
import "./App.css";
import { NetworkInfo } from "./models/models";

function App() {
  const [intrItem, setIntrItem] = useState<string[]>([]);
  const [netItem, setNetItem] = useState<NetworkInfo[]>([]);

  useEffect(()=>{
    invoke("interfaces").then((data)=>setIntrItem(data as SetStateAction<string[]>));
  }, ([]))
  
  const list_networks = (intr: string) => {
    getNetworks(intr).then((rows)=>setNetItem(rows))
  }
  return (
    <main className="container">
      <InterfaceList interfaces={intrItem} onInterfaceSelect={list_networks}></InterfaceList>
      <NetworkList items={netItem}/>
    </main>
  );
}

export default App;
