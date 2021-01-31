<template>
<div class="drop mt-3 mb-4">
  <input
    type="text"
    class="drop-input rounded-3"
    placeholder="Search Pokémon by name or number"
    v-model="inputString"
  />
  <div v-show="inputString" class="drop-list shadow-lg rounded-3">
    <div
      v-show="isVisible(r)"
      v-for="r in results"
      :key="r.id"
      class="list-item"
      @click="navigate(r.id)"
    >
      {{ r.name }} <span class="text-muted">&nbsp;({{ formatNumberId(r.id) }})</span>
    </div>
  </div>
</div>
</template>

<script>
import pokemonMixin from "../mixins/pokemonMixin";

export default {
  name: "SearchBar",
  props: ["results"],
  mixins: [pokemonMixin],
  data() {
    return {
      inputString: '',
    }
  },
  methods: {
    isVisible(item) {
      let name = item.name.toLowerCase() + this.formatNumberId(item.id);
      let input = this.inputString.toLowerCase();
      return name.includes(input);
    },
  }
};
</script>

<style>
.drop {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  z-index: 2000;
}
.drop-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid transparent;
  background: #edf2f7;
  line-height: 1.5em;
  outline: none;
}
.drop-input:focus {
  background: #fff;
  border-color: #e2e8f0;
}
.drop-input::placeholder {
  opacity: 0.7;
}
.drop-list {
  position: absolute;
  width: 100%;
  max-height: 500px;
  margin-top: 4px;
  overflow-y: auto;
  background: #ffffff;
}
.list-item {
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
}
.list-item:hover {
  background: #edf2f7;
}
</style>