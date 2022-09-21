import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardPokemon from "../components/CardPokemon";
import Filter from "../components/Filter";
import { clearDisplay, getAllPokemons, setPokemons } from "../redux/actions";
import Nav from "./Nav";
import style from "./SeccionPokemons.module.css"

export default function SeccionPokemon(props){
    const dispatch= useDispatch();
    const pokemons= useSelector(state=>state.pokemons);
    const pokemonsDisplay = useSelector(state=>state.pokemonsDisplay);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [pag, setPag] = useState();
    const layoutSeccion= 12;

    function paging(){
        const arrButton = []
        for(let i=1;i<=pag;i++){
            arrButton.push(i)
        }
        return arrButton;
    }

    const handleNext = ()=>{
        setIndex((prevState)=>prevState+layoutSeccion)
    }
    const handlePrev = ()=>{
        setIndex((prevState)=>prevState-layoutSeccion)
    }
    const handlePag = (i)=>{
        setIndex(i*layoutSeccion)
    }

    useEffect(()=>{
        if(!pokemons){
            dispatch(getAllPokemons());
        } else {
            dispatch(setPokemons());   
        }

        return ()=>{
            dispatch(clearDisplay());
        }

    }, [dispatch]);

    useEffect(()=>{
        const newPag= Math.ceil(pokemonsDisplay?.length/layoutSeccion)
        if(newPag<pag){
            setIndex(0);
        }
        setPag(newPag);
    }, [pokemonsDisplay]);

    return (
        <>
        <Nav showFilter={isFilterOpen} onFilter={()=>setIsFilterOpen(!isFilterOpen)}></Nav>
        <div className={style.flex}>
            <div>
                {isFilterOpen &&
                <Filter />
                }
            </div>
            <div className={style.seccion}>
                { pokemons?.error?<span>{pokemons.error}</span> 
                :pokemonsDisplay?.error? <span>Pokemon not Found, try again!</span>
                :pokemonsDisplay?.length? pokemonsDisplay.slice(index,index+layoutSeccion).map(pokemon=><CardPokemon key={pokemon.id} id={pokemon.id} image={pokemon.image} Types={pokemon.Types} name={pokemon.name}/>) 
                :<span>Cargando</span>}
            </div>
        </div>
        {<button disabled={index>0?false:true} onClick={handlePrev}>Prev</button>}
        {paging().map((b,i)=><button className={index+layoutSeccion===b*layoutSeccion?style.active:""} key={i} onClick={()=>handlePag(i)}>{b}</button>)}
        {<button disabled={pokemonsDisplay?.length-index>12?false:true} onClick={handleNext}>Next</button>}
        </>
    )
}