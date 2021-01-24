<template>
  <div>
    <h1 v-if="!notFound">{{ pokemon.name }}</h1>
    <h1 v-else>Pokemon not found :(</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Pokemon",
    props: {
      id: Number,
    },
    data() {
      return {
        pokemon: {},
        notFound: false,
      }
    },
    created() {
      let name = this.$pokedexCache.get(parseInt(this.id))
      if (name) {
        this.pokemon = this.$pokedexCache.get(name);
      } else {
        axios.get('https://pokeapi.co/api/v2/pokemon/' + this.id).then(({data}) => {
          this.pokemon = data;
        }).catch(err => {
          if (err.response.status === 404) {
            this.notFound = true;
          } else {
            console.log(err);
          }
        });
      }
    }
}
</script>

<style>
</style>