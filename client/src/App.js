import './App.css';
import { Route, Switch } from 'react-router-dom';
import SeccionPokemons from './containers/SeccionPokemons';
import Landing from './containers/Landing';
import PageNotFound from './containers/PageNotFound';
import PokemonDetail from './components/PokemonDetail';
import FormCreate from './components/FormCreate';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route exact path='/home'>
          <SeccionPokemons />
        </Route>
        <Route exact path='/create'>
          <FormCreate/>
        </Route>
        <Route exact path='/pokemons/:idPokemon' render={({match})=><PokemonDetail match={match} />} />
        <Route>
          <PageNotFound toggle={()=>{}} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;