import React from "react";
import style from "./Modal.module.css";

export default function Modal({ children }){
    return (
        <div className={style.modalBackground}>
            <div className={style.modal} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )    
}