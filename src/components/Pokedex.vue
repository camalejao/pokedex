<template>
  <div class="">
    <h1 class="text-center text-dark mb-3"><strong>Pokédex!</strong></h1>
    <div class="row">
      <div
        v-for="(p, idx) in pokemonList"
        v-bind:key="idx"
        class="col-xs-6 col-sm-6 col-md-3 col-xl-2 mb-3"
      >
        <PokemonCard v-if="pokedex.has(p.name)" v-bind="pokedex.get(p.name)" />
        <PokemonCard v-else v-bind="loading(p.name)" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PokemonCard from "./PokemonCard";

export default {
  name: "Pokedex",
  components: {
    PokemonCard,
  },
  data() {
    return {
      pokemonList: [],
      pokedex: new Map(),
    };
  },
  methods: {
    fetchPokemonList() {
      if (this.$pokedexCache.has("results")) {
        this.pokemonList = this.$pokedexCache.get("results");
        this.fetchPokemonFromList();
      } else {
        axios
          .get("https://pokeapi.co/api/v2/pokemon?limit=151")
          .then(({ data }) => {
            this.pokemonList = data.results;
            this.$pokedexCache.set("results", data.results);
            this.fetchPokemonFromList();
          });
      }
    },
    fetchPokemonFromList() {
      this.pokemonList.forEach((p) => {
        if (!this.$pokedexCache.has(p.name)) {
          console.log(`fetching ${p.name}`);
          axios.get(p.url).then(({ data }) => {
            let pokemon = this.parsePokemon(data);
            this.$pokedexCache.set(p.name, pokemon);
            this.pokedex.set(p.name, pokemon);
          });
        } else {
          this.pokedex.set(p.name, this.$pokedexCache.get(p.name));
        }
      });
    },
    parsePokemon(data) {
      let pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
        height: data.height,
        weight: data.weight,
      };
      return pokemon;
    },
    loading(name) {
      let p = {
        id: 0,
        name: name,
        image: null,
        types: ["loading"],
      };
      return p;
    },
  },
  created() {
    this.fetchPokemonList();
  },
};
</script>

<style>
</style>