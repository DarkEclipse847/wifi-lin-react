//https://www.youtube.com/watch?v=YwHJMlvZRCc 
//useful material to work with dialogs in react ↑↑↑↑

import { forwardRef } from "react"

type PopupProps = {
    children: string;
    toggleDialog: () => void;
};

export const Popup = forwardRef<HTMLDialogElement, PopupProps>
(
    ({children, toggleDialog}, ref) => {
        return(
            <dialog ref={ref} onClick={(e)=>{
                if(e.currentTarget === e.target){
                    toggleDialog()
                }
            }}>
                <div className="network-nav">
                    <h4 className="network-nav__header">{children}</h4>
                    <button className="network-nav__close-btn" onClick={toggleDialog}>close</button>
                </div>
                <form action="">
                    <input type="password" name={children} id="passwd" />
                </form>
            </dialog>
        )
        
    }
);