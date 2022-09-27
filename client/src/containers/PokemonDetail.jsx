import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import PreviewCardCreation from "../components/PreviewCardCreation";
import style from "./PokemonDetail.module.css";
import loadingPikachu from "../images/loadingPikachu.gif";
import errorPikachu from "../images/404-error-pokegif.gif";

export default function PokemonDetail({match}){
    
    const idPokemon= match.params.idPokemon;
    const [pokemonDetail, setPokemonDetail] = useState(false);
    const pokemonFind = useSelector(state=>state.pokemons?.find(p=>p.id===idPokemon));
    
    useEffect(()=>{
        if(!pokemonFind){
            fetch(`http://localhost:3001/pokemons/${idPokemon}`)
            .then(response=>response.json())
            .then(data=>setPokemonDetail(data))
            .catch(error=>console.log(error))
        } else {
            setPokemonDetail(pokemonFind);
        }
    },[pokemonFind, idPokemon])

    return (
        <>  
            <span className={style.id}>{pokemonDetail.id?.length? pokemonDetail.id.slice(): pokemonDetail.id? pokemonDetail.id : ""}</span>
            <img className={style.imageDetailLeft} src={pokemonDetail.image} alt="pokemonBg"/>
            <div className={style.flex}>
                <div className={style.detail}>
                    {pokemonDetail?.error?
                    <div><img className={style.gif} src={errorPikachu} alt="error"/><span className={style.span}>Pokemon ID not found, try again!</span></div>
                    :pokemonDetail? <PreviewCardCreation creation={{...pokemonDetail}}/>
                    :<div><img className={style.gif} src={loadingPikachu} alt="loading"/><span className={style.span}>loading</span></div>}
                </div>
            </div>
            <img className={style.imageDetailRight} src={pokemonDetail.image} alt="pokemonBg"/>
        </>
    )
}