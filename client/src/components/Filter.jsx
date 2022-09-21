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
        return () => dispatch(setPokemons());
    }, [dispatch])

    useEffect(()=>{
        if(allPokemons){
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
                        <select onChange={(e)=>handleOnChangeFilter(e)} name="origin">
                            <option value="all">all</option>
                            <option value="originals">originals</option>
                            <option value="created">created</option>
                        </select>
                    </fieldset>
                    <fieldset>      
                        <legend className={style.legend}>FILTER BY TYPE</legend>
                        <div className={style.grid}>
                        {pokemonsTypes?.length?
                        pokemonsTypes.map((type)=><div className={style.input} key={type.id}><input onChange={(e)=>handleOnChangeFilter(e)} type="radio" value={type.name} name="Types" />{type.name}</div>):<></>} 
                        </div>    
                    </fieldset>
                    <fieldset>
                        <legend className={style.legend}>ORDER BY</legend>
                        <div className={style.input}><input onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="name" name="orderBy" /> name</div>
                        <div className={style.input}><input onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="attack" name="orderBy" /> attack</div>
                        <div className={style.input}><input onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="defense" name="orderBy" /> defense</div>
                        <div className={style.input}><input onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="speed" name="orderBy" /> speed</div>
                        <div className={style.input}><input onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="hp" name="orderBy" /> Health point</div>
                        <div className={style.input}><input onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="weight" name="orderBy" /> weight</div>
                        <div className={style.input}><input onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="height" name="orderBy" /> height</div>
                    </fieldset>
                    <fieldset>
                        <legend className={style.legend}>ORDER AS</legend>
                        <div className={style.input}><input onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="ASC" name="orderAs" /> ascend</div>
                        <div className={style.input}><input onChange={(e)=>handleOnChangeOrder(e)} type="radio" value="DES" name="orderAs" /> descend</div>
                    </fieldset>
                </form>
            </div>
    )
}