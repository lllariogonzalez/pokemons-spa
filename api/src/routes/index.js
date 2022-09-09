const { Router } = require('express');
const axios = require('axios');
const { Tipo, Pokemon } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => {
    const {name} = req.query;
    if(name) {
        try {
            const {data} = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`)
            //return res.json(data);
            return res.json({
                id: data.id,
                name: data.name,
                types: data.types.map(t=>t.type.name),
                image: data.sprites.other.dream_world.front_default,
                height: data.height,
                weight: data.weight,
                hp: data.stats.find(e=>e.stat.name === 'hp').base_stat,
                attack: data.stats.find(e=>e.stat.name === 'attack').base_stat,
                defense: data.stats.find(e=>e.stat.name === 'defense').base_stat,
                speed: data.stats.find(e=>e.stat.name === 'speed').base_stat
            })
        } catch (error) {
            const pokemonFind = await Pokemon.findOne({where: {name: name}, include: Tipo});
            if(pokemonFind) {
                return res.json(pokemonFind)
            } else {
                return res.status(404).send("Pokemon not Found");
            }
        }
    }
    try {
        const {data: {results: pokemons}} = await axios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40');
        const promises = pokemons.map(p=>axios(p.url));
        const promisesResolves = await Promise.all(promises);
        const pokemonsDetail = promisesResolves.map(p=>{
            return {
                id: p.data.id,
                name: p.data.name,
                types: p.data.types.map(t=>t.type.name), 
                image: p.data.sprites.other.dream_world.front_default,
                height: p.data.height,
                weight: p.data.weight,
                hp: p.data.stats.find(e=>e.stat.name === 'hp').base_stat,
                attack: p.data.stats.find(e=>e.stat.name === 'attack').base_stat,
                defense: p.data.stats.find(e=>e.stat.name === 'defense').base_stat,
                speed: p.data.stats.find(e=>e.stat.name === 'speed').base_stat
            };
        })

        return res.json(pokemonsDetail);

    } catch (error) {
        return res.status(404).json({error: "Pokemons not Founds, reload the page"})
    } 

})

router.get('/pokemons/:idPokemon', async (req, res) => {
    const {idPokemon} = req.params;
    try {
        const {data} = await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        return res.json({
            id: data.id,
            name: data.name,
            types: data.types.map(t=>t.type.name), 
            image: data.sprites.other.dream_world.front_default,
            height: data.height,
            weight: data.weight,
            hp: data.stats.find(e=>e.stat.name === 'hp').base_stat,
            attack: data.stats.find(e=>e.stat.name === 'attack').base_stat,
            defense: data.stats.find(e=>e.stat.name === 'defense').base_stat,
            speed: data.stats.find(e=>e.stat.name === 'speed').base_stat,
        })
    } catch (error) {
        const regexUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if(regexUUID.test(idPokemon)){
            const pokeFind = await Pokemon.findByPk(idPokemon);
            if(pokeFind) return res.json(pokeFind)
        }
        return res.status(404).send("Pokemon not Found");
    }
})

router.get('/types', async (req, res)=>{
    const dbTypes = await Tipo.findAll();
    if(dbTypes.length) return res.json(dbTypes);
    const {data: {results: tipos}} = await axios('https://pokeapi.co/api/v2/type');
    const promises = tipos.map(tipo=>Tipo.create({name: tipo.name}));
    await Promise.all(promises);
    res.json(tipos);
})

router.post('/pokemons', async (req, res)=>{
    const newPokemon = req.body;
    if(newPokemon){
        const pokemon = await Pokemon.create(newPokemon);
        await pokemon.setTipos(newPokemon.types) // arreglo de tipos
        res.json(pokemon); 
    }

})


module.exports = router;
