const { Pokemon, db, Type } = require('../../src/db.js');

describe('Models', () => {

  jest.setTimeout(10000);

  beforeAll( async () => {
    //await db.authenticate().catch((err) => {console.error('Unable to connect to the database:', err)});
    await db.sync({ force: true });
  });
    
  // beforeEach(() => Pokemon.sync({ force: true }));

  describe('Validators Types model', () => {

    it('should not create the Type if name is not send o is invalid', async () => {
      expect.assertions(1);
      try {
        await Type.create({});
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('should work when its a valid name', async () => {
      const type = await Type.create({
        name: 'fire',
      });
      expect(type.toJSON()).toHaveProperty('name','fire');
    });
  });

  describe('Validators Pokemon model', () => {

    describe('name', () => {

      it('should not create the pokemon if name is not send o is invalid', async () => {
        expect.assertions(1);
        try {
          await Pokemon.create({});
        } catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('should work when its a valid name', async () => {
        const poke = await Pokemon.create({
          name: 'newpoke',
        });
        expect(poke.toJSON()).toHaveProperty('name','newpoke');
      });

    });

    describe('image', () => {

      it('should not create the pokemon if image is not valid URL', async () => {
        expect.assertions(1);
        try {
          await Pokemon.create({name: "newpoke", image: "pokeimage"});
        } catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      it('should work when its a valid URL', async () => {
        const poke = await Pokemon.create({
          name: 'mewtwo',
          image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg"
        });
        expect(poke.toJSON()).toHaveProperty('name','mewtwo');
      });

    });

    describe('hp', () => {

      it('should not create the pokemon if health points is not valid range', async () => {
        expect.assertions(1);
        try {
          await Pokemon.create({name: "newpoke", hp: 150});
        } catch (error) {
          expect(error.message).toBeDefined();
        }
      });

    });

  });

  afterAll(async()=>{
    await db.close();
  });

});
