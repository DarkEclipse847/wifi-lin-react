import { NetworkInfo } from "../models/models";

const NetworkList = ({items}: {items: NetworkInfo[]})=>{
    return(
        <>
            <h1>Avaliable Networks</h1>
            <ul className="list">
                {items.map((item)=>(
                    <li className="list_item" key={item.ssid}>
                        {item.ssid}
                    </li>
                ))}
            </ul>
        </>
    )
};
export default NetworkList;