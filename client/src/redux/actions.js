export const SET_POKEMONS="SET_POKEMONS";
export const GET_ALL_POKEMONS="GET_ALL_POKEMONS";
export const SEARCH_POKEMON="SEARCH_POKEMON";
export const CLEAR_DISPLAY="CLEAR_DISPLAY";
export const GET_TYPES="GET_TYPES";
export const CREATE_POKEMON="CREATE_POKEMON";

export const getAllPokemons = () => dispatch => {
    return fetch("http://localhost:3001/pokemons")
    .then(response=> response.json())
    .then(data => {
        return dispatch({type: GET_ALL_POKEMONS, payload: data});
    })
};

export const searchPokemon = (name) => dispatch => {
    return fetch(`http://localhost:3001/pokemons?name=${name}`)
    .then(response=> response.json())
    .then(data => {
        return dispatch({type: SEARCH_POKEMON, payload: data});
    })
    .catch(error => {
        return dispatch({type: SEARCH_POKEMON, payload:{error:error}});
    })
};

export const getTypes = () => dispatch => {
    return fetch(`http://localhost:3001/types`)
    .then(response=> response.json())
    .then(data => {
        return dispatch({type: GET_TYPES, payload: data});
    })
};

export const createPokemon = (creation) => dispatch => {
    return fetch(`http://localhost:3001/pokemons`, {method:"POST", headers: {
        'Content-Type': 'application/json'}, body: JSON.stringify(creation)})
    .then(response=> response.json())
    .then(data => {
        return dispatch({type: CREATE_POKEMON, payload: data.ok});
    })
};

export const clearDisplay = ()=> {
    return {type: CLEAR_DISPLAY};
};

export const setPokemons = ()=> {
    return {type: SET_POKEMONS};
};