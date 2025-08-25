import { useState, useRef } from "react";
import { NetworkInfo } from "../models/models";
import { Popup } from "./Form";


const NetworkList = ({items}: {items: NetworkInfo[]})=>{
    const [dialogContent, setDialogContent] = useState<string>("")
    const dialogRef = useRef<HTMLDialogElement>(null)
    function toggleDialog(){
        if(!dialogRef.current){
            return
        }
        dialogRef.current.hasAttribute("open")
            ? dialogRef.current.close()
            : dialogRef.current.showModal()
    }

    return(
        <>
            <h1>Avaliable Networks</h1>
            <ul className="networks-list">
                {items.map((item)=>( 
                    <li className="networks-list__item" key={item.ssid} onClick={()=>{
                            setDialogContent(item.ssid)
                            toggleDialog()
                    }}>
                        {item.ssid}
                    </li>
                ))}
            </ul>
            <Popup ref={dialogRef} toggleDialog={toggleDialog}>{dialogContent}</Popup>
        </>
    )
};
export default NetworkList;