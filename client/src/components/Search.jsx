import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearDisplay, searchPokemon, setPokemons } from "../redux/actions";

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
        }
        setInput("");
    }

    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input value={input} onChange={(e)=>handleOnChange(e)} type="search" placeholder="Nombre del Pokemon ..." autoComplete="off" />
                <button type="submit">{input.length ? "Search" : "Search All"}</button>
            </form>
        </div>
    )
}