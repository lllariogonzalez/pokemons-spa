import React from "react";
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css';
import logo from "../images/logo.png";

export default function Nav(){

    return (
        <div className={`${style.bg} ${style.align}`}>
            <NavLink exact to='/'><img className={style.logo} src={logo} alt="logo PokeApi"/></NavLink>
            <div className={style.align}>
                <NavLink to='/home'>Home</NavLink>
                <NavLink to='/create'>Create Pokemon</NavLink>
            </div>
        </div>
    )
}