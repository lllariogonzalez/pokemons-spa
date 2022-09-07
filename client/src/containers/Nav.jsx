import React from "react";
import { Link } from 'react-router-dom';
import Search from "../components/Search";
import style from './Nav.module.css'
export default function Nav(props){
    
    return (
        <div className={`${style.bg} ${style.align}`}>
            <Search />
            <Link to='/create'><button className={style.btn}>Crea tu Pokemon</button></Link>
        </div>
    )
}

