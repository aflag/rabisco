<template>
  <h2>{{title}}</h2>
</template>

<script>
    export default {
        name: "SecondaryHeader",
        props: {
            title: {
                type: String,
                required: true
            }
        }
    };
</script>

<style scoped>
  h2 {
    color: #4f4f4f;
    font-size: 2.2em;
  }
</style>