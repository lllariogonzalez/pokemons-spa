export const GET_POKEMONS="GET_POKEMONS";
export const SEARCH_POKEMON="SEARCH_POKEMON";
export const CLEAR_SEARCH="CLEAR_SEARCH";

export const getPokemos = () => dispatch => {
    return fetch("http://localhost:3001/pokemons")
    .then(response=> response.json())
    .then(data => {
        return dispatch({type: GET_POKEMONS, payload: data});
    })
};

export const searchPokemon = (name) => dispatch => {
    return fetch(`http://localhost:3001/pokemons?name=${name}`)
    .then(response=> response.json())
    .then(data => {
        return dispatch({type: SEARCH_POKEMON, payload: data});
    })
};

export const clearSearch = ()=> {
    return {type: CLEAR_SEARCH};
};
