<template>
  <div id="app">
    <notifications position="top center"/>
    <the-header/>
    <router-view/>
  </div>
</template>

<script>
    import TheHeader from '@/components/TheHeader.vue';

    export default {
        name: 'app',
        components: {
            'the-header': TheHeader
        }
    };
</script>

<style>
  #app {
    margin: auto;
    max-width: 1200px;
    font-family: 'Open Sans', sans-serif;
  }
</style>