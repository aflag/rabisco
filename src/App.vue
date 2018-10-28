<template>
  <div id="app">
    <notifications position="top center" />
    <TheHeader/>
    <router-view/>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue'

export default {
  name: 'app',
  components: {
    TheHeader
  }
}
</script>

<style>
#app {
  margin: auto;
  max-width: 1200px;
  font-family: 'Open Sans', sans-serif;
}
</style>
