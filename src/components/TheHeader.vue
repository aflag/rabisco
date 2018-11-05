<template>
  <header>
    <h1><router-link :to="{name: 'home'}">Rabisco</router-link></h1>
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style scoped>
h1 {
  font-family: 'Nanum Pen Script', cursive;
  font-size: 6em;
  text-align: center;
  margin: 0;
  font-weight: normal;
}
a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  color: #afafaf;
  text-decoration:none;
  cursor:pointer;
}
</style>
