<template>
  <div :id="id" class="card h-100 text-center shadow">
    <img
      v-if="currentSrc === null"
      class="placeholder mx-auto"
      :src="require('@/assets/pokeball.png')"
      :alt="name"
    />
    <router-link v-else :to="{ name:'pokemon', params: { id } }">
      <img class="rounded mx-auto" :src="image" :alt="name" />
    </router-link>
    <div class="card-body">
      <span class="text-muted">
        <small>{{ number }}</small>
      </span>
      <br />
      <router-link
        v-if="id > 0"
        class="card-title"
        :to="{ name:'pokemon', params: { id } }"
      >
        {{ capitalName }}
      </router-link>
      <span v-else class="card-title">
        {{ capitalName }}
      </span>
      <br />
      <small>
        <span
          v-for="(type, idx) in types"
          v-bind:key="idx"
          :class="'badge badge-type rounded-pill text-white ' + type"
        >
          {{ type.toUpperCase() }}
        </span>
      </small>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    id: Number,
    name: String,
    image: String,
    types: Array,
  },
  data() {
    return {
      currentSrc: null,
    };
  },
  mounted: function () {
    let pokemonImg, that;
    pokemonImg = new Image();
    that = this;
    pokemonImg.onload = function () {
      that.currentSrc = that.image;
    };
    pokemonImg.src = that.image;
  },
  computed: {
    number() {
      let id = this.id.toString();
      if (!id) return "#000";
      if (id.length == 1) {
        return `#00${id}`;
      } else if (id.length == 2) {
        return `#0${id}`;
      } else {
        return `#${id}`;
      }
    },
    capitalName() {
      return this.name[0].toUpperCase() + this.name.slice(1);
    },
  },
};
</script>

<style>
.placeholder {
  animation: rotation 3s linear infinite;
}
.placeholder-large {
  animation: rotation 6s linear infinite;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
.card-title {
  font-size: 1.17em;
  text-decoration: none;
  color: black;
}
.badge-type {
  margin-left: 0.1em;
  margin-right: 0.1em;
  width: 7em;
}
.fire {
  background-color: #ee420e !important;
}
.water {
  background-color: #0c67c2 !important;
}
.grass {
  background-color: #3f9f08 !important;
}
.bug {
  background-color: #8e9c11 !important;
}
.poison {
  background-color: #6b246e !important;
}
.ice {
  background-color: #34f0f9 !important;
}
.normal {
  background-color: #ada594 !important;
}
.fighting {
  background-color: #722c17 !important;
}
.electric {
  background-color: #fbb917 !important;
}
.flying {
  background-color: #9f6ec1 !important;
}
.dragon {
  background-color: #4e3ba4 !important;
}
.rock {
  background-color: #9e863d !important;
}
.ground {
  background-color: #ad8c33 !important;
}
.steel {
  background-color: #8e8e9f !important;
}
.ghost {
  background-color: #454593 !important;
}
.fairy {
  background-color: #eba1eb !important;
}
.psychic {
  background-color: #dc3165 !important;
}
.dark {
  background-color: #3c2d23 !important;
}
.loading {
  background-color: #b1b1b1 !important;
}
</style>