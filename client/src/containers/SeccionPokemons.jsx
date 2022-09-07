import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardPokemon from "../components/CardPokemon";
import { getPokemos } from "../redux/actions";
import style from "./SeccionPokemons.module.css"

export default function SeccionPokemon(props){
    const dispatch= useDispatch();
    const pokemons= useSelector(state=>state.pokemons);
    const [index, setIndex] = useState(0);
    const [pag, setPag] = useState();
    const numViews= 12;

    function numeroPag(){
        const arrButton = []
        for(let i=1;i<=pag;i++){
            arrButton.push(i)
        }
        return arrButton;
    }

    const handleNext = ()=>{
        setIndex((prevState)=>prevState+numViews)
    }
    const handlePrev = ()=>{
        setIndex((prevState)=>prevState-numViews)
    }
    const handlePag = (i)=>{
        setIndex(i*numViews)
    }

    useEffect(()=>{
        dispatch(getPokemos());
    }, [dispatch]);

    useEffect(()=>{
        setPag(Math.ceil(pokemons?.length/numViews))
    }, [pokemons, pag]);

    return (
        <>
        <div className={style.seccion}>
            { pokemons ? pokemons.slice(index,index+numViews).map(pokemon=><CardPokemon key={pokemon.id} image={pokemon.image} types={pokemon.types} name={pokemon.name}/>) : <span>Cargando</span> }
        </div>
        {index>0?<button onClick={handlePrev}>Prev</button>:<></>}
        {numeroPag().map((b,i)=><button key={i} onClick={()=>handlePag(i)}>{b}</button>)}
        {pokemons?.length-index>12?<button onClick={handleNext}>Next</button>:<></>}
        </>
    )
}