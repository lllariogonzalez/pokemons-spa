import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

export default function PokemonDetail({match}){
    
    const idPokemon= match.params.idPokemon;
    const [pokemonDetail, setPokemonDetail] = useState();
    const pokemonFind = useSelector(state=>state.pokemons?.find(p=>p.id===Number(idPokemon)));
        
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
        <div>
            {pokemonDetail? 
                <>
                    <h1>ID: {pokemonDetail.id}</h1>
                    <h1>{pokemonDetail.name.toUpperCase()}</h1>
                    <img src={pokemonDetail.image} alt={`Pokemon ${idPokemon}`} />
                </>
            :<span>Cargando Detalles</span> }   
        </div>
    )
}