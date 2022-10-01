import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, setPokemons } from "../redux/actions";
import CardPokemon from "../components/CardPokemon";
import Filter from "../components/Filter";
import Search from "../components/Search";
import smoothScroll from "../services/smoothScroll";
import paging from "../services/paging";
import style from "./SectionPokemons.module.css";
import loadingPikachu from "../images/loadingPikachu.gif";
import errorPikachu from "../images/404-error-pokegif.gif";

export default function SeccionPokemon(){
    const dispatch= useDispatch();
    const pokemons= useSelector(state=>state.pokemons);
    const pokemonsDisplay = useSelector(state=>state.pokemonsDisplay);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const [pages, setPages] = useState([]);

    const cardPerPag= 12;

    const handlePag = (e,i)=>{
        if(e.target.textContent==="Prev"){
            setIndex((prevState)=>prevState-cardPerPag);
        }else if(e.target.textContent==="Next"){
            setIndex((prevState)=>prevState+cardPerPag);
        }else{
            setIndex(i*cardPerPag);
        }
        
        if(e.target.offsetTop>700){
            smoothScroll(e.target.offsetTop);
        }
    }

    useEffect(()=>{
        if(!pokemons){
            dispatch(getAllPokemons());
        } else {
            dispatch(setPokemons());   
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    useEffect(()=>{
        const newPag= Math.ceil(pokemonsDisplay?.length/cardPerPag)

        if(newPag<pages.length || isNaN(newPag)){
            setIndex(0);
        }
        setPages(paging(newPag));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pokemonsDisplay]);

    return (
        <div className={style.flexContainer}>
            
            {isFilterOpen && pokemonsDisplay &&
            <div className={style.filter}>
                <Filter />
            </div>
            }
            
            <div className={style.flexcolum}>

                <div className={style.tools}>
                    {pokemonsDisplay?.length > 1 || isFilterOpen ? 
                    <button onClick={()=>setIsFilterOpen(!isFilterOpen)}>
                        {isFilterOpen? "Close Filter" : "Filter / Sort" }
                    </button>
                    :<></>}
                    {pokemonsDisplay && <Search filter={()=>setIsFilterOpen(false)} />}
                </div>

                <div className={style.section}>
                    {pokemonsDisplay?.error? 
                    <div>
                        <img style={{width:"100%"}} src={errorPikachu} alt="error"/>
                        <span className={style.span}>{pokemonsDisplay.error}</span>
                    </div>
                    :pokemonsDisplay?.length? 
                    pokemonsDisplay.slice(index,index+cardPerPag).map(pokemon=><CardPokemon key={pokemon.id} id={pokemon.id} image={pokemon.image} Types={pokemon.Types} name={pokemon.name}/>) 
                    :<div>
                        <img style={{width:"100%"}} src={loadingPikachu} alt="loading"/>
                        <span className={style.span}>loading</span>
                    </div>}
                </div>

                <div className={style.pagination}>
                    {<button value="prev" disabled={index>0?false:true} onClick={(e)=>handlePag(e)}>Prev</button>}
                    {pages.map((b,i)=><button className={index+cardPerPag===b*cardPerPag?style.active:""} key={i} onClick={(e)=>handlePag(e,i)}>{b}</button>)}
                    {<button disabled={pokemonsDisplay?.length-index>cardPerPag?false:true} onClick={(e)=>handlePag(e)}>Next</button>}
                </div>

            </div>

        </div>
    )
};