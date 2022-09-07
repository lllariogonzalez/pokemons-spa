import './App.css';
import { Route, Link } from 'react-router-dom';
import landingImage from './images/pokemon.png';
import Nav from './containers/Nav';
import SeccionPokemons from './containers/SeccionPokemons';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Link to='/home'><button>Home</button></Link>
        <h1>Henry Pokemon</h1>
        <img src={landingImage} alt='Landing Background'/>
      </Route>
      <Route exact path='/home'>
        <Nav />
        <SeccionPokemons />
      </Route>
      <Route exact path='/create'>
        <h1>Build your Pokemon</h1>
      </Route>
      <Route path='/pokemons/:idPokemon'>
        <h1>Pokemon`s Detail</h1>
      </Route>
    </div>
  );
}

export default App;

//https://pokeapi.co/api/v2/pokemon?offset=0&limit=40