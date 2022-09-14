import React from "react";
import style from "./Modal.module.css";

export default function Modal({children, onClose}){
    return (
        <div className={style.modalBackground} onClick={onClose}>
            <div className={style.modal} onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    )    
}