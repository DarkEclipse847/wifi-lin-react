import { SetStateAction, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import NetworkList from "./components/NetworkList"
import { Navbar } from "./components/Navbar";
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
      <Navbar interfaces={intrItem} onEvent={list_networks}></Navbar>
      <NetworkList items={netItem}/>
    </main>
  );
}

export default App;
