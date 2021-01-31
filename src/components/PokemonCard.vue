<template>
  <div :id="id" class="card h-100 text-center shadow">
    <img
      v-if="currentSrc === null"
      class="placeholder mx-auto"
      :src="require('@/assets/img/pokeball.png')"
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
        {{ name }}
      </router-link>
      <span v-else class="card-title">
        {{ name }}
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
import pokemonMixin from "../mixins/pokemonMixin";

export default {
  name: "PokemonCard",
  props: {
    id: Number,
    name: String,
    image: String,
    types: Array,
  },
  mixins: [pokemonMixin],
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
      return this.formatNumberId(this.id.toString());
    },
  },
};
</script>

<style>
.card-title {
  font-size: 1.17em;
  text-decoration: none;
  color: black;
}
</style>