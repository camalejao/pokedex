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
    <div v-if="pokemonList.length > 0 && pokemonList.length < maxPokemon" class="text-center mb-3">
      <button class="btn btn-outline-dark" @click="fetchMorePokemon()">Load more Pokemon</button>
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
      maxPokemon: 898,
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
          }).catch(err => {
            console.log(err);
            this.fetchPokemonList(); // repeat call in case of error
          });
      }
    },
    fetchPokemonFromList() {
      this.pokemonList.forEach((p) => {
        if (!this.$pokedexCache.has(p.name)) {
          console.log(`fetching ${p.name}`);
          axios.get(p.url).then(({ data }) => {
            let pokemon = this.parsePokemon(data);
            if (pokemon.id <= this.maxPokemon) {
              this.$pokedexCache.set(p.name, pokemon);
              this.$pokedexCache.set(pokemon.id, p.name);
              this.pokedex.set(p.name, pokemon);
            }
          }).catch(err => {
            console.log(err);
            this.fetchPokemonFromUrl(p.url);
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
        art: data.sprites.other['official-artwork'].front_default,
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
    fetchPokemonFromUrl(url) {
      axios.get(url).then(({ data }) => {
        let pokemon = this.parsePokemon(data);
        this.$pokedexCache.set(pokemon.name, pokemon);
        this.$pokedexCache.set(pokemon.id, pokemon.name);
        this.pokedex.set(pokemon.name, pokemon);
      }).catch(err => {
        console.log(err);
        this.fetchPokemonFromUrl(url);
      });
    },
    fetchMorePokemon() {
      axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151&offset=${this.pokemonList.length}`)
      .then(({ data }) => {
        this.pokemonList = this.pokemonList.concat(data.results);
        this.$pokedexCache.set("results", this.pokemonList);
        if (this.pokemonList.length < this.maxPokemon) {
          this.nextCall = data.next;
        } else {
          this.nextCall = "";
          this.pokemonList.length = this.maxPokemon;
        }
        this.fetchPokemonFromList();
      }).catch(err => console.log(err));
    }
  },
  created() {
    this.fetchPokemonList();
  },
};
</script>

<style>
</style>