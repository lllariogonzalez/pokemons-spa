import { GET_POKEMONS } from "./actions.js";

const stateInitial= {}

export default function rootReducer(state = stateInitial, action){
    switch (action.type){
        case GET_POKEMONS:
            return {
                ...JSON.parse(JSON.stringify(state)),
                pokemons: action.payload
            }
        default: return state;
    }
}