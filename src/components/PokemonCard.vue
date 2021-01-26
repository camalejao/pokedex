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
          :class="'badge rounded-pill text-white ' + type"
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
  animation: rotation 2s linear infinite;
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
.badge {
  margin-left: 0.1em;
  margin-right: 0.1em;
  width: 7em;
}
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