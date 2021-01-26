<template>
  <div class="container-xl">
    <h1 v-if="notFound">Pokemon not found :(</h1>
    <div v-else class="card mt-5 shadow">
      <div class="row">
        <div class="col-sm-12 col-md-7 col-lg-6">
          <img
            class="img-fluid rounded mx-auto d-block"
            :src="image"
            :alt="name"
          />
        </div>
        <div class="col-md-5 col-lg-6 d-none d-md-block text-center">
          <h1 class="display-4 mt-5">
            <strong>{{ name }}</strong>
          </h1>
          <h4><span
            v-for="(type, idx) in pokemon.types"
            v-bind:key="idx"
            :class="'badge rounded-pill text-white ' + type"
          >
            {{ type.toUpperCase() }}
          </span></h4>
        </div>
      </div>
      <div class="card-body">
        <h1 class="d-block d-md-none display-4 mt-5 text-center">
          <strong>{{ name }}</strong>
        </h1>
        <h4 class="d-block d-md-none text-center"><span
          v-for="(type, idx) in pokemon.types"
          v-bind:key="idx"
          :class="'badge rounded-pill text-white ' + type"
        >
          {{ type.toUpperCase() }}
        </span></h4>
        <!-- <div class="progress">
          <div
            class="progress-bar text-start"
            role="progressbar"
            style="width: 63%"
          >
            <span class="m-5">63</span>
          </div>
        </div> -->
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
  },
  created() {
    let name = this.$pokedexCache.get(parseInt(this.id));
    if (name) {
      this.pokemon = this.$pokedexCache.get(name);
    } else {
      axios
        .get("https://pokeapi.co/api/v2/pokemon/" + this.id)
        .then(({ data }) => {
          this.pokemon = this.parsePokemon(data);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.notFound = true;
          } else {
            console.log(err);
          }
        });
    }
  },
};
</script>

<style>
.badge.fire {
  background-color: #ee420e;
}
.badge.water {
  background-color: #0c67c2;
}
.badge.grass {
  background-color: #3f9f08;
}
.badge.bug {
  background-color: #8e9c11;
}
.badge.poison {
  background-color: #6b246e;
}
.badge.ice {
  background-color: #34f0f9;
}
.badge.normal {
  background-color: #ada594;
}
.badge.fighting {
  background-color: #722c17;
}
.badge.electric {
  background-color: #fbb917;
}
.badge.flying {
  background-color: #9f6ec1;
}
.badge.dragon {
  background-color: #4e3ba4;
}
.badge.rock {
  background-color: #9e863d;
}
.badge.ground {
  background-color: #ad8c33;
}
.badge.steel {
  background-color: #8e8e9f;
}
.badge.ghost {
  background-color: #454593;
}
.badge.fairy {
  background-color: #eba1eb;
}
.badge.psychic {
  background-color: #dc3165;
}
.badge.dark {
  background-color: #3c2d23;
}
.badge.loading {
  background-color: #b1b1b1;
}
</style>