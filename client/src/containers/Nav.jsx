import React from "react";
import { NavLink } from 'react-router-dom';
import style from './Nav.module.css'

export default function Nav(props){

    return (
        <div className={`${style.bg} ${style.align}`}>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/create'>Create Pokemon</NavLink>
            {/* <NavLink to='/favourites'>Create Pokemon</NavLink> */}
        </div>
    )
}

