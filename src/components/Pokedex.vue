<template>
  <div class="container">
    <h1 class="text-center mb-3"><strong>Pokédex!</strong></h1>
    <ul class="list-group">
      <li v-for="(p, idx) in pokemon" v-bind:key="idx" class="list-group-item text-center">
        {{ p.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Pokedex",
  data() {
    return {
      pokemon: [],
    };
  },
  methods: {
    getPokemon() {
      axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=151")
        .then(({ data }) => {
          console.log(data.results);
          this.pokemon = data.results;
        });
    },
  },
  created() {
    this.getPokemon();
  },
};
</script>