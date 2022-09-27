import React from "react";
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';
import logo from "../images/logo.png";

export default function Nav(){

    return (
        <div className={`${style.bg} ${style.align}`}>
            <img className={style.logo} src={logo} alt="logoPokemonHenry"/>
            <div className={style.align}>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/create'>Create Pokemon</NavLink>
            </div>
            {/* <NavLink to='/favourites'>Create Pokemon</NavLink> */}
        </div>
    )
}

