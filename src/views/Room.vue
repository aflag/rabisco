<template>
  <div class="waiting" v-if="room == null">
    <img alt="Loading" src="../assets/loading.gif">
  </div>
  <div v-else class="room">
    <Game :room="room" />
  </div>
</template>

<script>
import Game from '@/components/Game.vue'
import rabisco from '@/rabisco.js'

export default {
  name: 'room',
  components: {
    Game
  },
  data() {
     return {
        room: null,
     }
  },
  created() {
    var loadData = () => {
      rabisco.getRoom(this.$route.params.id)
        .then(response => this.room = response.data)
    }
    loadData()
    setInterval(loadData, 15000)
  }
}
</script>
<style scoped>
.waiting {
  text-align: center;
}
</style>
