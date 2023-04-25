export const SET_POKEMONS = "SET_POKEMONS";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const SEARCH_POKEMON = "SEARCH_POKEMON";
export const CLEAR_DISPLAY = "CLEAR_DISPLAY";
export const GET_TYPES = "GET_TYPES";
export const FILTER_AND_ORDER = "FILTER_AND_ORDER";

export const getAllPokemons = () => dispatch => {
    return fetch(`${process.env.REACT_APP_API}/pokemons`)
        .then(response => response.json())
        .then(data => {
            return dispatch({ type: GET_ALL_POKEMONS, payload: data });
        })
        .catch((error) => {
            alert(`El servidor está desplegado 🚀 en Railway.app de manera gratuita, y en estos momentos se encuentra fuera de servicio, puedes mirar el repositorio y probarlo localmente. O puedes intentarlo otro día. Generalmente el servicio se encuentra activo del 1 al 20 de cada mes. Discule las molestias, gracias por su visita! 💛`)
        })
};

export const searchPokemon = (name) => dispatch => {
    return fetch(`${process.env.REACT_APP_API}/pokemons?name=${name}`)
        .then(response => response.json())
        .then(data => {
            return dispatch({ type: SEARCH_POKEMON, payload: data });
        })
        .catch(error => {
            return dispatch({ type: SEARCH_POKEMON, payload: { error: error } });
        })
};

export const getTypes = () => dispatch => {
    return fetch(`${process.env.REACT_APP_API}/types`)
        .then(response => response.json())
        .then(data => {
            return dispatch({ type: GET_TYPES, payload: data });
        })
};

export const clearDisplay = () => {
    return { type: CLEAR_DISPLAY };
};

export const setPokemons = () => {
    return { type: SET_POKEMONS };
};

export const filterAndOrder = (pokemons) => {
    return { type: FILTER_AND_ORDER, payload: pokemons };
};