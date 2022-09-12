import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearDisplay, searchPokemon } from "../redux/actions";

export default function Search(props){

    const [input, setInput] = useState("");
    const dispatch = useDispatch();

    const handleOnChange = (e)=>{
        setInput(e.target.value);
    }
    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(clearDisplay());
        dispatch(searchPokemon(input.toLowerCase()));
    }
    
    useEffect(()=>{
        return ()=>{
            dispatch(clearDisplay());
        }
    }, [dispatch])

    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input onChange={(e)=>handleOnChange(e)} type="search" placeholder="Nombre del Pokemon ..." autoComplete="off" />
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}