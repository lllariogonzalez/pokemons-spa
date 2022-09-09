import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardPokemon from "../components/CardPokemon";
import { getAllPokemons, setPokemons } from "../redux/actions";
import style from "./SeccionPokemons.module.css"

export default function SeccionPokemon(props){
    const dispatch= useDispatch();
    const pokemons= useSelector(state=>state.pokemons);
    const pokemonsDisplay = useSelector(state=>state.pokemonsDisplay);
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
        if(!pokemons){
            dispatch(getAllPokemons());
        } else {
            dispatch(setPokemons())
        }
    }, [dispatch]);

    useEffect(()=>{
        setPag(Math.ceil(pokemonsDisplay?.length/numViews))
    }, [pokemonsDisplay, pag]);

    return (
        <>
        <div className={style.seccion}>
            { pokemons?.error?<span>{pokemons.error}</span>
            :pokemonsDisplay?.error? <span>Pokemon not Found, try again!</span>
            :pokemonsDisplay?.length? pokemonsDisplay.slice(index,index+numViews).map(pokemon=><CardPokemon key={pokemon.id} id={pokemon.id} image={pokemon.image} types={pokemon.types} name={pokemon.name}/>) 
            : <span>Cargando</span> }
        </div>
        {<button disabled={index>0?false:true} onClick={handlePrev}>Prev</button>}
        {numeroPag().map((b,i)=><button className={index+numViews===b*numViews?style.active:""} key={i} onClick={()=>handlePag(i)}>{b}</button>)}
        {<button disabled={pokemonsDisplay?.length-index>12?false:true} onClick={handleNext}>Next</button>}
        </>
    )
}