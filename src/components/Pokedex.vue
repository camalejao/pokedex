<template>
  <div class="container-fluid">
    <h1 class="text-center text-dark mb-3"><strong>Pokédex!</strong></h1>
    <div class="row">
      <div v-for="(p, idx) in pokemonList" v-bind:key="idx" class="col-xs-6 col-sm-6 col-md-3 col-lg-2 mb-3">
        <div class="card text-center shadow">
          <img :src="image(p.name)" class="rounded mx-auto" :alt="p.name" />
          <div class="card-body">
            <span class="text-muted">{{ number(p.name) }}</span><br>
            <span class="card-title">
              <strong>{{ p.name[0].toUpperCase() + p.name.slice(1) }}</strong>
            </span><br>
            <span
              v-for="(type, idx) in types(p.name)"
              v-bind:key="idx"
              :class="'badge badge-pill ' + type"
            >
              {{ type.toUpperCase() }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Pokedex",
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
            this.$pokedexCache.set(p.name, data);
            this.pokedex.set(p.name, data);
          });
        } else {
          this.pokedex.set(p.name, this.$pokedexCache.get(p.name));
        }
      });
    },
    number(name) {
      let pokemon = this.pokedex.get(name);
      if (pokemon) {
        let id = pokemon.id.toString();
        if (id.length == 1) {
          return `#00${id}`;
        } else if (id.length == 2) {
          return `#0${id}`;
        } else {
          return `#${id}`;
        }
      } else {
        return "#000";
      }
    },
    types(name) {
      let pokemon = this.pokedex.get(name);
      return pokemon ? pokemon.types.map((t) => t.type.name) : ["LOADING"];
    },
    image(name) {
      let pokemon = this.pokedex.get(name);
      return pokemon ? pokemon.sprites.front_default : require(`@/assets/ball.png`);
    },
  },
  created() {
    this.fetchPokemonList();
  },
};
</script>

<style>
.fire {
  color: #ee420e
}
.water {
  color: #0c67c2
}
.grass {
  color: #3f9f08
}
.bug {
  color: #8e9c11
}
.poison {
  color: #6b246e
}
.ice {
  color: #34f0f9
}
.normal {
  color: #ada594
}
.fighting {
  color: #722c17
}
.electric {
  color: #fbb917
}
.flying {
  color: #9f6ec1
}
.dragon {
  color: #4e3ba4
}
.rock {
  color: #9e863d
}
.ground {
  color: #ad8c33
}
.steel {
  color: #8e8e9f
}
.ghost {
  color: #454593
}
.fairy {
  color: #eba1eb
}
.psychic {
  color: #dc3165
}
.dark {
  color: #3c2d23
}
</style>