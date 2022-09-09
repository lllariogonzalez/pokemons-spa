import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearch, searchPokemon } from "../redux/actions";

export default function Search(props){

    const [input, setInput] = useState();
    const dispatch = useDispatch();

    const handleOnChange = (e)=>{
        setInput(e.target.value)
    }
    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(searchPokemon(input.toLowerCase()));
    }
    
    useEffect(()=>{
        return ()=>{
            dispatch(clearSearch());
        }
    }, [dispatch])

    return (
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <input onChange={(e)=>handleOnChange(e)} type="search" placeholder="Nombre del Pokemon ..." />
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}