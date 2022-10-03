import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDisplay, searchPokemon, setPokemons } from "../redux/actions";
import style from "./Search.module.css";

export default function Search(props){

    const pokemons = useSelector(state=>state.pokemons);
    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleOnChange = (e)=>{
        setInput(e.target.value);
    }
    const handleSubmit= (e)=>{
        e.preventDefault();
        if(input.length){
            dispatch(clearDisplay());
            dispatch(searchPokemon(input.toLowerCase()));
        }else{
            pokemons && dispatch(setPokemons());
            props.filter();
        }
        setInput("");
    }

    return (
            <form className={style.searchBar} onSubmit={(e)=>handleSubmit(e)}>
                <input value={input} onChange={(e)=>handleOnChange(e)} type="search" placeholder="Pokemon's name..." autoComplete="off" />
                <button type="submit">{input.length ? "🔍" : "ALL"}</button>
            </form>
    )
}