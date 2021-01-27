import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon';
import Error404 from './components/Error404';

export default [
  { name: 'home', path: '/', component: Pokedex },
  { name: 'pokemon', path: '/pokemon/:id', component: Pokemon, props: true },
  { name: '404', path: '/:pathMatch(.*)*', component: Error404 },
]