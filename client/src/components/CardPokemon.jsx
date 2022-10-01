import React from "react";
import { Link } from "react-router-dom";
import style from "./CardPokemon.module.css";
import pokegif from "../images/whos-that.gif";

export default function CardPokemon(props){

    return (
            <div className={style.container}>
                <div className={style.card}>
                    <div className={style.imgbox}>
                        <img src={pokegif && props.image} alt="pokemon"/>
                        <h2>{props.name.toUpperCase()}</h2>
                    </div>
                    <div className={style.content}>
                        <div className={style.divtypes}>
                            {props.Types.map((type,i)=><span key={i} className={`${type.name}`}>{type.name.toUpperCase()}</span>)}
                        </div>
                        <div className="btnPrincipal"><Link style={{"textDecoration":"none"}} to={`/pokemons/${props.id}`}>Detalle</Link></div>
                    </div>
                </div>
            </div>
    )
}