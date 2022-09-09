import { CLEAR_SEARCH, GET_POKEMONS, SEARCH_POKEMON } from "./actions.js";

const stateInitial= {}

export default function rootReducer(state = stateInitial, action){
    switch (action.type){
        case GET_POKEMONS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemons: action.payload
            }
        case SEARCH_POKEMON:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemons: [action.payload]
            }
        case CLEAR_SEARCH:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemons: []
            }
        default: return state;
    }
}