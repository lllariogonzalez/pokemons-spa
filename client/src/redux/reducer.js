import { CLEAR_SEARCH, SET_POKEMONS, SEARCH_POKEMON, GET_ALL_POKEMONS } from "./actions.js";

const stateInitial= {}

export default function rootReducer(state = stateInitial, action){
    switch (action.type){
        case GET_ALL_POKEMONS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemons: action.payload,
                pokemonsDisplay: action.payload
            }
        case SET_POKEMONS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemonsDisplay: [...JSON.parse(JSON.stringify(state.pokemons))]
            }
        case SEARCH_POKEMON:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemonsDisplay: action.payload
            }
        case CLEAR_SEARCH:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemonsDisplay: []
            }
        default: return state;
    }
}