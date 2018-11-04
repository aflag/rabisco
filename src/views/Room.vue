<template>
  <div class="waiting" v-if="room == null">
    <img alt="Loading" src="../assets/loading.gif">
  </div>
  <div v-else class="room">
    <room-roster v-if="room.state === 'waiting'" :roomName="room.id" :players="room.players" @start-game="startGame"/>
    <room-game v-if="room.state === 'running'" :room="room"/>
    <room-showcase v-if="room.state === 'scoring'" :room="room" @next-score="nextScore"/>
  </div>
</template>

<script>
    import RoomGame from '@/components/RoomGame.vue';
    import RoomRoster from '@/components/RoomRoster.vue';
    import RoomShowcase from '@/components/RoomShowcase.vue';

    import rabisco from '@/mixins/rabisco';

    export default {
        name: 'room',
        components: {
            'room-game': RoomGame,
            'room-roster': RoomRoster,
            'room-showcase': RoomShowcase
        },
        methods: {
            startGame() {
                rabisco.start(this.room.id)
                  .then(this.reloadRoom)
                  .catch(() => this.$notify({type: 'error', text: 'Garrô aqui. Tenta de novo!'}));
            },
            reloadRoom() {
                rabisco.getRoom(this.$route.params.id)
                  .then(response => this.room = response.data);
            },
            nextScore() {
                rabisco.nextScore(this.room.id)
                  .then(this.reloadRoom)
                  .catch(() => this.$notify({type: 'error', text: 'Garrô aqui. Tenta de novo!'}))
            }
        },
        data() {
            return {
                room: null,
            };
        },
        created() {
            this.reloadRoom();
            setInterval(this.reloadRoom, 800);
        }
    };
</script>
<style scoped>
  .waiting {
    text-align: center;
  }

  .room {
    padding: 30px;
  }
</style>
