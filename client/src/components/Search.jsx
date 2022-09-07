import React from "react";

export default function Search(props){
    return (
        <div>
            <input name="name" /* value="NaN" */ type="text" placeholder="Nombre del Pokemon ..." />
            <button>Buscar</button>
        </div>
    )
}