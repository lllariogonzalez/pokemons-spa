import { Route, Switch } from 'react-router-dom';
import SectionPokemons from './containers/SectionPokemons';
import Landing from './containers/Landing';
import PageNotFound from './containers/PageNotFound';
import PokemonDetail from './containers/PokemonDetail';
import FormCreate from './containers/FormCreate';
import Nav from './components/Nav';
import Footer from './components/Footer';


export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route exact path='/home'>
          <Nav />
          <SectionPokemons />
          <Footer />
        </Route>
        <Route exact path='/create'>
          <Nav />
          <FormCreate/>
          <Footer />
        </Route>
        <Route exact path='/pokemons/:idPokemon' render={({match})=><><Nav /><PokemonDetail match={match} /><Footer /></>} />
        <Route>
          <Nav />
          <PageNotFound toggle={()=>{}} />
          <Footer />
        </Route>
      </Switch>
    </div>
  );
};