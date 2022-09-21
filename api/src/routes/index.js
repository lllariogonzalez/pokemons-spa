const { Router } = require('express');
const { getPokemons, getPokemonsById, getTypes, postPokemon } = require('../controllers/pokemonsController.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', getPokemons);

router.get('/pokemons/:idPokemon', getPokemonsById);

router.post('/pokemons', postPokemon);

router.get('/types', getTypes);


module.exports = router;