<template>
  <div class="roster">
    <div class="center">
      <secondary-header :title="`Sala ${roomName}`"/>
    </div>
    <h3>Jogadores</h3>
    <ul>
      <li v-for="player in players" :key="player.id"><div class="flex-item">{{player.id}}</div></li>
    </ul>
    <form action="javascript:void(0);" class="pure-form">
      <button class="pure-button pure-button-primary" @click="$emit('start-game')">Começar</button>
    </form>
  </div>
</template>

<script>
    import SecondaryHeader from '@/components/SecondaryHeader.vue';

    export default {
        name: "RoomRoster",
        components: {
            'secondary-header': SecondaryHeader
        },
        props: {
            players: {
                type: Array,
                required: true
            },
            roomName: {
                type: String,
                required: true
            }
        }
    };
</script>

<style scoped>
  li {
    list-style-type: none;
    height: 2.2em;
    width: 20em;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: #969696;
    display: flex;
    align-items: center;
  }
  ul {
    padding: 0;
  }
  form {
    margin-top: 2.2em;
  }
  h3 {
    color: #4f4f4f;
    font-size: 1.2em;
  }
  .center {
    text-align: center;
  }
</style>