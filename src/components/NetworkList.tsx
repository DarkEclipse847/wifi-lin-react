import { NetworkInfo } from "../models/models";

const NetworkList = ({items}: {items: NetworkInfo[]})=>{
    return(
        <>
            <h1>Avaliable Networks</h1>
            <ul>
                {items.map((item)=>(
                    <li key={item.ssid}>
                        {item.ssid}
                    </li>
                ))}
            </ul>
        </>
    )
};
export default NetworkList;