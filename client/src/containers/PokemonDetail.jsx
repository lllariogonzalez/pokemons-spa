import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import CardDetail from "../components/CardDetail";
import style from "./PokemonDetail.module.css";
import loadingPikachu from "../images/loadingPikachu.gif";
import errorPikachu from "../images/404-error-pokegif.gif";
import who from "../images/who.png";

export default function PokemonDetail({match}){
    
    const idPokemon= match.params.idPokemon;
    const [pokemonDetail, setPokemonDetail] = useState(false);
    const pokemonFind = useSelector(state=>state.pokemons?.find(p=>p.id===idPokemon));
    
    useEffect(()=>{
        if(!pokemonFind){
            fetch(`${process.env.REACT_APP_API}/pokemons/${idPokemon}`)
            .then(response=>response.json())
            .then(data=>setPokemonDetail(data))
            .catch(error=>console.log(error))
        } else {
            setPokemonDetail(pokemonFind);
        }
    },[pokemonFind, idPokemon])

    return (
        <div className={style.container}>
            <span className={style.id}>{pokemonDetail.id}</span>
            <img className={style.imageDetailLeft} src={pokemonDetail.image || who} alt="pokemonBg"/>

            {pokemonDetail?.error?
            <div><img className={style.gif} src={errorPikachu} alt="error"/><span className={style.span}>{pokemonDetail.error}</span></div>
            :pokemonDetail? <CardDetail pokemon={{...pokemonDetail}}/>
            :<div><img className={style.gif} src={loadingPikachu} alt="loading"/><span className={style.span}>loading</span></div>}
            
            <img className={style.imageDetailRight} src={pokemonDetail.image || who} alt="pokemonBg"/>
        </div>
    )
}