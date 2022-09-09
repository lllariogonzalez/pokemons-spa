import React from "react";
import { Link } from "react-router-dom";
import pokeball from "../images/pokeball.svg";
import style from "./CardPokemon.module.css";

export default function CardPokemon(props){
    return (
        <Link style={{"textDecoration":"none"}} to={`/pokemons/${props.id}`}>
            <div className={`${style.align} ${style.bg}`}>
                <div>
                    <h2>{props.name.toUpperCase()}</h2>
                    <ul>
                        {props.types.map((t,i)=><li key={i}>{t}</li>)}
                    </ul>
                </div>
                <div>
                    <img className={style.img} src={props.image || pokeball} alt="" />
                </div>
            </div>
        </Link>
    )
}