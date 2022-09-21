/* eslint-disable import/no-extraneous-dependencies */
const session = require('supertest');
const server = require('../../src/app.js');
const { Pokemon, db } = require('../../src/db.js');

const request = session(server);  

/* const pokemon = {
  name: 'newpoke',
}; */

describe('Pokemon routes', () => {
  jest.setTimeout(30000);
  beforeAll(async () => {
      //await db.authenticate().catch((err) => {console.error('Unable to connect to the database:', err)});
      await db.sync({ force: true });
    }
  );

  //beforeEach(() => Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon)).then(()=>console.log("created")));
  describe('GET /types', () => {

    it('should respond with a 200 status code and should respond with an array of 20 types', async () =>{
      const response = await request.get('/types');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(20);
      }
    );

  });

  describe('GET /pokemons', () => {

    it('should respond with a 200 status code and should respond with an array of 41 pokemons', async () =>{
      const newpoke = await Pokemon.create({name: "newpoke"});
      const response = await request.get('/pokemons');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(41);
      }
    );

    it('should respond with a 200 status when send a query name valid and existend and should respond with a array of one pokemon', async()=>{
      const response = await request.get('/pokemons?name=pikachu');
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(1);
    });

    it('should respond with a 404 status code when send a query name invalid or inexistend', async ()=>{
      const response = await request.get('/pokemons?name=pikapika');
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("Pokemon not Found");
    })

  });

  describe('GET /pokemons/:id', () => {

    it('should respond with a 200 status code and should respond with an object pokemon when id exist', async () =>{
      const response = await request.get('/pokemons/150');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name','mewtwo');
      }
    );
    
    it('should respond with a 404 status code when the id is invalid or inexistend', async()=>{
      const response = await request.get('/pokemons/a150');
      expect(response.statusCode).toBe(404);
      expect(response.body.error).toBe("Pokemon not Found");
      }
    );

  });

  describe('POST /pokemons', () => {

    it('should respond with a 201 status code and should create a new pokemon in DB', async () =>{
      const response = await request.post('/pokemons').send({name: "pokenew", Types: [1, 2]});
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('ok', true);
      return
      }
    );
    
    it('should respond with a 400 status code when the id is invalid or inexistend', async()=>{
      const response = await request.post('/pokemons').send({name: "PokeNew", Types: [1, 2]});
      expect(response.statusCode).toBe(400);
      expect(response.body.error).toBe("Validation error: only lower case");
      return
      }
    );

  });


  afterAll(async()=>{
    await db.sync({force: true});
    db.close();
  })

});
