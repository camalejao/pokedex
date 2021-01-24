import Pokedex from './components/Pokedex';
import Pokemon from './components/Pokemon'

export default [
  { name: 'home', path: '/', component: Pokedex },
  { name: 'pokemon', path: '/pokemon/:id', component: Pokemon, props: true },
]