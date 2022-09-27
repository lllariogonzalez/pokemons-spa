import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, filterAndOrder, setPokemons } from "../redux/actions";
import orderService from "../services/sort.js";
import filterService from "../services/filter.js";
import style from "./Filter.module.css";

export default function Filter(){

    const pokemonsTypes= useSelector(state=>state.pokemonsTypes);
    const allPokemons= useSelector((state)=>state.pokemons);
    const dispatch = useDispatch();
    const [order, setOrder] = useState({});
    const [filter, setFilter] = useState({});

    useEffect(()=>{
        if(!pokemonsTypes){
            dispatch(getTypes());
        }
        if(allPokemons){ 
            dispatch(setPokemons());
        }
        if(Array.isArray(allPokemons))
        return () => dispatch(setPokemons());   
    }, [dispatch])

    useEffect(()=>{
        if(Array.isArray(allPokemons)){ // si pokemons existe pero no es array de pokemons sino obj error
            let pokemons=[...JSON.parse(JSON.stringify(allPokemons))]
            pokemons = filterService(pokemons, filter);
            if(pokemons && pokemons.length===0){
                return dispatch(filterAndOrder({error: "Not Found!"}));
            }
            dispatch(filterAndOrder(orderService(pokemons, order)));
        }
    }, [dispatch, filter, order])


    const handleOnChangeOrder= (e)=>{
        setOrder((prevState)=>{
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleOnChangeFilter= (e)=>{
        setFilter((prevState)=>{
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
    }

    return (
            <div className={style.flex}>
                <form>
                    <fieldset>
                        <legend className={style.legend}>FILTER BY ORIGIN</legend>
                        <select className={style.select} onChange={(e)=>handleOnChangeFilter(e)} name="origin">
                            <option value="all">all</option>
                            <option value="originals">originals</option>
                            <option value="created">created</option>
                        </select>
                    </fieldset>
                    <fieldset>      
                        <legend className={style.legend}>FILTER BY TYPE</legend>
                        <div className={style.grid}>
                        {pokemonsTypes?.length?
                        pokemonsTypes.map((type)=><div className={style.input} key={type.id}><input id={type.id} onChange={(e)=>handleOnChangeFilter(e)} type="radio" value={type.name} name="Types" /><label htmlFor={type.id} className={`${style.input} ${type.name} label`} >{type.name}</label></div>):<></>} 
                        </div>    
                    </fieldset>
                    <fieldset>
                        <legend className={style.legend}>ORDER BY</legend>
                        <div className={style.grid}>
                        <div className={style.input}><input id="name" onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="name" name="orderBy" /><label htmlFor="name" className={`${style.input} label`} > name</label></div>
                        <div className={style.input}><input id="attack" onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="attack" name="orderBy" /><label htmlFor="attack" className={`${style.input} label`} > attack</label></div>
                        <div className={style.input}><input id="defense" onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="defense" name="orderBy" /><label htmlFor="defense" className={`${style.input} label`} > defense</label></div>
                        <div className={style.input}><input id="speed" onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="speed" name="orderBy" /><label htmlFor="speed" className={`${style.input} label`} > speed</label></div>
                        {/* <div className={style.input}><input id="hp" onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="hp" name="orderBy" /><label htmlFor="hp" className={`${style.input} label`} > health point</label></div> */}
                        <div className={style.input}><input id="weight" onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="weight" name="orderBy" /><label htmlFor="weight" className={`${style.input} label`} > weight</label></div>
                        <div className={style.input}><input id="height" onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="height" name="orderBy" /><label htmlFor="height" className={`${style.input} label`} > height</label></div>
                        </div>   
                    </fieldset>
                    <fieldset>
                        <legend className={style.legend}>ORDER AS</legend>
                        <div className={style.grid}>
                        <div className={style.input}><input id="ASC" onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="ASC" name="orderAs" /><label htmlFor="ASC" className={`${style.input} label`} > ascend</label></div>
                        <div className={style.input}><input id="DES" onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="DES" name="orderAs" /><label htmlFor="DES" className={`${style.input} label`} > descend</label></div>
                        </div>
                    </fieldset>
                </form>
            </div>
    )
}