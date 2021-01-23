<template>
  <div class="card text-center shadow">
    <img
      v-if="currentSrc === null"
      class="placeholder mx-auto"
      :src="require('@/assets/pokeball.png')"
      :alt="name"
    />
    <img v-else class="rounded mx-auto" :src="image" :alt="name" />
    <div class="card-body">
      <span class="text-muted"><small>{{ number }}</small></span>
      <br />
      <span class="card-title">
        {{ name[0].toUpperCase() + name.slice(1) }}
      </span>
      <br />
      <span
        v-for="(type, idx) in types"
        v-bind:key="idx"
        :class="'badge ' + type"
      >
        {{ type.toUpperCase() }}
      </span>
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
  font-size: 1.17em
}
.badge.fire {
  color: #ee420e;
}
.badge.water {
  color: #0c67c2;
}
.badge.grass {
  color: #3f9f08;
}
.badge.bug {
  color: #8e9c11;
}
.badge.poison {
  color: #6b246e;
}
.badge.ice {
  color: #34f0f9;
}
.badge.normal {
  color: #ada594;
}
.badge.fighting {
  color: #722c17;
}
.badge.electric {
  color: #fbb917;
}
.badge.flying {
  color: #9f6ec1;
}
.badge.dragon {
  color: #4e3ba4;
}
.badge.rock {
  color: #9e863d;
}
.badge.ground {
  color: #ad8c33;
}
.badge.steel {
  color: #8e8e9f;
}
.badge.ghost {
  color: #454593;
}
.badge.fairy {
  color: #eba1eb;
}
.badge.psychic {
  color: #dc3165;
}
.badge.dark {
  color: #3c2d23;
}
.badge.loading {
  color: #b1b1b1;
}
</style>