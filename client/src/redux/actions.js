export const SET_POKEMONS="SET_POKEMONS";
export const GET_ALL_POKEMONS="GET_ALL_POKEMONS";
export const SEARCH_POKEMON="SEARCH_POKEMON";
export const CLEAR_SEARCH="CLEAR_SEARCH";

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
        return dispatch({type: SEARCH_POKEMON, payload: [data]});
    })
    .catch(error => {
        return dispatch({type: SEARCH_POKEMON, payload:{error:error}});
    })
};

export const clearSearch = ()=> {
    return {type: CLEAR_SEARCH};
};

export const setPokemons = ()=> {
    return {type: SET_POKEMONS};
};