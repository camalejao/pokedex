<template>
  <nav id="pokenav" class="navbar sticky-top navbar-light bg-light">
    <div class="container-xxl">
      <a
        v-if="$route.name == 'home'"
        class="navbar-brand" style="cursor: pointer;"
        @click="top()"
      >
        Pokédex
      </a>
      <router-link
        v-else
        class="navbar-brand"
        :to="{ name:'home', hash: `#${$route.params.id}` }"
      >
        Pokédex
      </router-link>
    </div>
  </nav>  
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      prevPos: window.pageYOffset,
    }
  },
  methods: {
    top() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    scroll() {
      window.onscroll = () => {
        let currentPos = window.pageYOffset;
        if (this.prevPos > currentPos) {
          document.getElementById("pokenav").style.top = "0";
        } else {
          document.getElementById("pokenav").style.top = "-60px";
        }
        this.prevPos = currentPos;
      }
    }
  },
  created() {
    this.prevPos = window.pageYOffset;
    this.scroll();
  }
};
</script>

<style>
#pokenav {
  top: 0;
  transition: top 0.3s;
}
</style>