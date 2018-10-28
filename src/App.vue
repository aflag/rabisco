<template>
  <div id="app">
    <notifications position="top center" />
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  margin: auto;
  max-width: 1200px;
}
</style>
