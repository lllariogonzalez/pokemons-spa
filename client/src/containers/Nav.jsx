import React from "react";
import { Link } from 'react-router-dom';
import Search from "../components/Search";
import style from './Nav.module.css'

export default function Nav(props){

    return (
        <div className={`${style.bg} ${style.align}`}>
            <button className={style.btn} onClick={props.onFilter}>{props.showFilter? "Close Filter" : "Filter / Sort" }</button>
            <Search />
            <Link to='/create'><button className={style.btn}>Create Pokemon</button></Link>
        </div>
    )
}

