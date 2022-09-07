export const GET_POKEMONS="GET_POKEMONS";

export const getPokemos = () => dispatch => {
    return fetch("http://localhost:3001/pokemons")
    .then(response=> response.json())
    .then(data => {
        return dispatch({type: GET_POKEMONS, payload: data});
    })
};