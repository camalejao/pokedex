<template>
<div class="drop mt-3 mb-4">
  <input
    type="text"
    class="drop-input rounded-3"
    placeholder="Search Pokémon by name or number"
    v-model="inputString"
    @keydown.down="onArrowDown"
    @keydown.up="onArrowUp"
    @keyup.enter="onEnter"
  />
  <div id="drop-list" v-show="inputString" class="drop-list shadow-lg rounded-3">
    <div
      v-for="(r, i) in filteredResults"
      :key="r.id"
      class="list-item"
      :class="i == arrowIndex ? 'active-item' : ''"
      @click="navigate(r.id)"
      @mouseover="onMouseOver(i)"
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
      arrowIndex: -1,
    }
  },
  computed: {
    filteredResults() {
      return this.results.filter(r => {
        let name = r.name.toLowerCase() + this.formatNumberId(r.id);
        let input = this.inputString.toLowerCase();
        this.arrowIndex = -1;
        return name.includes(input);
      });
    }
  },
  methods: {
    onArrowUp() {
      if (this.arrowIndex >= 0) {
        this.arrowIndex -= 1;
        let target = document.getElementsByClassName('active-item')[0];
        if (target) {
          let parent = target.parentNode;
          if (target.offsetTop - parent.scrollTop <= 0)
            parent.scrollTop -= target.offsetHeight;
        }
      } else {
        this.arrowIndex = this.filteredResults.length - 1;
        let el = document.getElementById('drop-list');
        el.scrollTop = el.scrollHeight;
      }
    },
    onArrowDown() {
      if (this.arrowIndex < this.filteredResults.length - 1) {
        this.arrowIndex += 1;
        let target = document.getElementsByClassName('active-item')[0];
        if (target) {
          let parent = target.parentNode;
          if (target.offsetTop - parent.scrollTop >= parent.offsetHeight - target.offsetHeight)
            parent.scrollTop += target.offsetHeight;
        }
      } else {
        this.arrowIndex = -1;
        document.getElementById('drop-list').scrollTop = 0;
      }
    },
    onEnter() {
      if (this.arrowIndex >= 0 && this.arrowIndex < this.filteredResults.length) {
        this.navigate(this.filteredResults[this.arrowIndex].id);
      }
    },
    onMouseOver(i) {
      this.arrowIndex = i;
    }
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
.active-item {
  background: #edf2f7;
}
</style>