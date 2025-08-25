import InterfaceList from "./Interface";
import { RefreshBtn } from "./Refresh";

type NavProps = {
    interfaces: string[],
    onEvent: (list_networks: string)=>void;
}

//Wrapper for nav components to style this properly
export const Navbar = ({interfaces, onEvent}: NavProps) => {
    return(
        <nav className="navbar">
            <InterfaceList interfaces={interfaces} onInterfaceSelect={onEvent}></InterfaceList>
            <RefreshBtn interfaces={interfaces} onRefresh={onEvent}></RefreshBtn>
        </nav>
    )
}