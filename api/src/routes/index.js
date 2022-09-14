const { Router } = require('express');
const axios = require('axios');
const { Type, Pokemon } = require('../db.js');
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
            return res.json([{
                id: data.id,
                name: data.name,
                Types: data.types.map(t=>t.type),
                image: data.sprites.other.dream_world.front_default,
                height: data.height,
                weight: data.weight,
                hp: data.stats.find(e=>e.stat.name === 'hp').base_stat,
                attack: data.stats.find(e=>e.stat.name === 'attack').base_stat,
                defense: data.stats.find(e=>e.stat.name === 'defense').base_stat,
                speed: data.stats.find(e=>e.stat.name === 'speed').base_stat
            }])
        } catch (error) {
            const pokemonFind = await Pokemon.findOne({where: {name: name}, include: Type});
            if(pokemonFind) {
                return res.json([pokemonFind])
            } else {
                return res.status(404).json({error: "Pokemon not Found"});
            }
        }
    }

    try {
        const {data: {results: pokemons}} = await axios('https://pokeapi.co/api/v2/pokemon?offset=0&limit=40');
        const promises = pokemons.map(p=>axios(p.url));
        const pokeApi = await Promise.all(promises);
        const dbPokemons = await Pokemon.findAll({include: Type,});

        const pokeApiData = pokeApi.map(p=>{
            return {
                id: p.data.id,
                name: p.data.name,
                Types: p.data.types.map(t=>t.type), 
                image: p.data.sprites.other.dream_world.front_default,
                height: p.data.height,
                weight: p.data.weight,
                hp: p.data.stats.find(e=>e.stat.name === 'hp').base_stat,
                attack: p.data.stats.find(e=>e.stat.name === 'attack').base_stat,
                defense: p.data.stats.find(e=>e.stat.name === 'defense').base_stat,
                speed: p.data.stats.find(e=>e.stat.name === 'speed').base_stat
            };
        })

        dbPokemons? res.json([...pokeApiData, ...dbPokemons]): res.json(pokeApiData);

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
            Types: data.types.map(t=>t.type), 
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
            const pokeFind = await Pokemon.findByPk(idPokemon, {include: Type});
            if(pokeFind) return res.json(pokeFind);
        }
        return res.status(404).send("Pokemon not Found");
    }
})

router.get('/types', async (req, res)=>{
    var dbTypes = await Type.findAll();
    if(dbTypes.length) return res.json(dbTypes);
    const {data: {results}} = await axios('https://pokeapi.co/api/v2/type');
    const promises = results.map(t=>Type.create({name: t.name}));
    await Promise.all(promises);
    dbTypes = await Type.findAll();
    res.json(dbTypes);
})

router.post('/pokemons', async (req, res)=>{
    const newPokemon = req.body;
    if(newPokemon){
        try {
            const pokemonCreated = await Pokemon.create(newPokemon);
            await pokemonCreated.setTypes(newPokemon.Types)
            res.json({ok: true});
        } catch (error) {
            res.json({ok: false});
        }
    }
})


module.exports = router;
