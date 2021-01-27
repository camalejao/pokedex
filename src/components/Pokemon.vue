<template>
  <div class="container-xl">
    <h1 v-if="notFound">Pokemon not found :(</h1>
    <div v-else-if="!loaded" class="row mt-5">
      <div class="col mt-5">
        <img
          class="placeholder-large img-fluid mx-auto d-block"
          style="{ max-width: 300px; max-height: 300px; }"
          :src="require('@/assets/pokeball-large.png')"
          :alt="name"
        />
      </div>
    </div>
    <div v-else class="card mt-3 mb-5 shadow">
      <div class="row">
        <!-- Pokemon image/art -->
        <div class="col-sm-12 col-md-7 col-lg-6">
          <img
            class="img-fluid mx-auto d-block"
            :src="image"
            :alt="name"
          />
        </div>

        <!-- Content -->
        <div class="col-sm-12 col-md-5 col-lg-6 d-flex flex-column justify-content-between text-center">
          <!-- Pokemon name and type(s) -->
          <div>
            <h1 class="display-4 mt-5">
              <strong>{{ name }}</strong>
            </h1>
            <h4>
              <span
                v-for="(type, idx) in pokemon.types"
                v-bind:key="idx"
                :class="'badge badge-type rounded-pill text-white ' + type"
              >
                {{ type.toUpperCase() }}
              </span>
            </h4>
          </div>

          <!-- Pokemon info (id, height and weight) -->
          <div>
            <h5 class="mt-5"><span class="text-muted">{{ number(pokemon.id) }}</span></h5>
            <h5>Height: {{ pokemon.height/10 }} m</h5>
            <h5 class="mb-5">Weight: {{ pokemon.weight/10 }} kg</h5>
          </div>

          <!-- Navigation buttons (prev/next) -->
          <div class="mb-5">
            <button
              v-if="parseInt(id) > 1"
              @click="navigate(pokemon.id - 1)"
              class="btn btn-outline-dark h-100 w-sm-50 w-md-25"
              style="margin-right: 0.1em;"
            >
              Prev ({{ number(pokemon.id - 1) }})
            </button>
            <button
              v-if="parseInt(id) < maxPokemon"
              @click="navigate(pokemon.id + 1)"
              class="btn btn-outline-dark h-100 w-sm-50 w-md-25"
              style="margin-left: 0.1em;"
            >
              Next ({{ number(pokemon.id + 1) }})
            </button>
          </div>
        </div>
      </div>

      <div class="card-body">
        <h4 class="mb-3">Stats</h4>
        <div v-for="(s, idx) in pokemon.stats" :key="idx">
          <h6>
            {{ s.name.toUpperCase() }}
            <span class="text-muted">{{ s.value }}</span>
          </h6>
          <div :class="'progress mb-3'" style="height: 25px;">
            <div
              :class="pokemon.types[0] + ' progress-bar text-start'"
              role="progressbar"
              :style="`width: ${(s.value/160) * 100}%;`"
            >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Pokemon",
  props: {
    id: Number,
  },
  data() {
    return {
      pokemon: {},
      notFound: false,
      maxPokemon: 898,
      loaded: false,
    };
  },
  computed: {
    name() {
      if (Object.keys(this.pokemon).length > 0) {
        return this.pokemon.name[0].toUpperCase() + this.pokemon.name.slice(1);
      } else {
        return "";
      }
    },
    types() {
      if (Object.keys(this.pokemon).length > 0) {
        return this.pokemon.types;
      } else {
        return ["loading"];
      }
    },
    image() {
      if (Object.keys(this.pokemon).length > 0) {
        return this.pokemon.art;
      } else {
        return require("@/assets/pokeball.png");
      }
    },
  },
  methods: {
    number(id) {
      if (id) {
        id = id.toString();
        if (id.length == 1) {
          return `#00${id}`;
        } else if (id.length == 2) {
          return `#0${id}`;
        } else {
          return `#${id}`;
        }
      } else {
        return '#000';
      }
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
        stats: data.stats.map((s) => {
          return { name: s.stat.name, value: s.base_stat }
        }),
      };
      return pokemon;
    },
    navigate(id) {
      this.$router.push({ name: 'pokemon', params: { id } });
    },
    fetchPokemon(id) {
      let name = this.$pokedexCache.get(parseInt(id));
      if (name) {
        this.pokemon = this.$pokedexCache.get(name);
        this.loaded = true;
        console.log(`loaded ${name} from cache`);
      } else {
        console.log(`fetching #${id}`);
        axios
          .get("https://pokeapi.co/api/v2/pokemon/" + id)
          .then(({ data }) => {
            this.pokemon = this.parsePokemon(data);
            this.loaded = true;
          })
          .catch((err) => {
            if (err.response.status === 404) {
              this.notFound = true;
            } else {
              console.log(err);
            }
          });
      }
    }
  },
  created() {
    this.fetchPokemon(this.id);
  },
  beforeRouteUpdate(to) {
    this.loaded = false;
    this.fetchPokemon(to.params.id);
  }
};
</script>

<style>
</style>