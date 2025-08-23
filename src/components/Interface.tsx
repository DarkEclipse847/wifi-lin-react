import React, { useState } from "react";

type InterfaceProps = {
    interfaces: string[];
    onInterfaceSelect: (list_networks: string)=>void;
}

const InterfaceList = ({interfaces, onInterfaceSelect}: InterfaceProps)=>{
    const [value, setValue] = useState('')
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
        onInterfaceSelect(e.target.value)
    }
    return(
        // onSelect is not working for some reason
        <select onChange = {handleSelect}>
            <option disabled value={""}>
                -- Choose an Interface --
            </option>
            {interfaces.map((data)=>(
                <option key={data} value={data}>
                    {data}
                </option>
            ))}
        </select>
    )
};

export default InterfaceList;