export default {
  data() {
    return {
    }
  },
  methods: {
    capitalizeString(str) {
      return str[0].toUpperCase() + str.slice(1);
    },
    parsePokemon(data) {
      let pokemon = {
        id: data.id,
        name: this.capitalizeString(data.name),
        image: data.sprites.front_default,
        art: data.sprites.other['official-artwork'].front_default,
        types: data.types.map((t) => t.type.name),
        height: data.height,
        weight: data.weight,
        stats: data.stats.map((s) => {
          return { name: s.stat.name, value: s.base_stat }
        }),
        species_url: data.species.url,
      };
      return pokemon;
    },
    navigate(id) {
      this.$router.push({ name: 'pokemon', params: { id }});
    },
    formatNumberId(id) {
      if (!id) return `#000`;
      if (id.length == 1) {
        return `#00${id}`;
      } else if (id.length == 2) {
        return `#0${id}`;
      } else {
        return `#${id}`;
      }
    }
  }
}