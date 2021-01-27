<template>
  <div class="text-center">
    <h1 class="mb-3">Ops, page not found!</h1>
    <button
      @click="$router.push({ name: 'home' })"
      class="btn btn-outline-dark"
    >
      Go back
    </button>
  </div>
</template>

<script>
export default {
  name: "Error404",
};
</script>

<style>
</style>