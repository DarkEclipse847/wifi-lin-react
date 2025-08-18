import { SetStateAction, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import NetworkList from "./components/NetworkList"
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
  list_networks("wlan0")
  return (
    <main className="container">
      <select>
        {intrItem.map((data)=>(
          <option key={data}>
            {data}
          </option>
        ))}
      </select>
      <NetworkList items={netItem}/>
    </main>
  );
}

export default App;
