<template>
  <div class="lobby" v-if="backend.phonedHome">
    <div v-if="backend.playerName">
      <form action="javascript:void(0);" class="pure-form">
        <button class="create pure-button pure-button-primary" @click="createRoom()">Criar novo jogo</button>
      </form>
        <div class="choice">ou</div>
      <form action="javascript:void(0);" class="pure-form">
        <input v-model="roomId" type="text" placeholder="Nome do jogo" autofocus>
        <button class="pure-button pure-button-primary" @click="join()">Entrar</button>
      </form>
    </div>
    <form v-else action="javascript:void(0);" class="pure-form login">
      <secondary-header title="Seu nome, seu bairro"/>
      <input v-model="input.playerName" type="text" placeholder="Seu nome" autofocus>
      <button class="pure-button pure-button-primary" @click="login()">OK</button>
    </form>
  </div>
  <div class="waiting" v-else>
    <img alt="Loading" src="../assets/loading.gif">
  </div>
</template>

<script>
    import SecondaryHeader from '@/components/SecondaryHeader.vue';

    import rabisco from '@/mixins/rabisco';

    export default {
        name: 'lobby',
        components: {
            'secondary-header': SecondaryHeader
        },
        methods: {
            createRoom() {
                rabisco.createRoom()
                  .then(response => {
                      this.$router.push({path: response.headers['location']});
                  })
                  .catch(() => {
                      this.$notify({type: 'error', text: 'Garrô aqui. Tenta de novo!'});
                  });
            },
            login() {
                rabisco.login(this.input.playerName)
                  .then(() => this.backend.playerName = this.input.playerName)
                  .catch(() => {
                      this.$notify({type: 'error', text: 'Garrô aqui. Tenta de novo!'});
                  });
            },
            join() {
                rabisco.joinRoom(this.roomId)
                  .then(() => this.$router.push({name: 'rooms', params: {id: this.roomId}}))
                  .catch(() => {
                      this.$notify({type: 'error', text: 'Garrô aqui. Tenta de novo!'});
                  });
            }
        },
        data() {
            return {
                backend: {
                    phonedHome: false,
                    playerName: null
                },
                input: {
                    playerName: null
                },
                roomId: null
            };
        },
        created() {
            rabisco.getMe()
              .then(response => {
                  this.backend.playerName = response.data.name;
                  this.backend.phonedHome = true;
              })
              .catch(() => {
                  this.backend.phonedHome = true;
              });
        }
    };
</script>
<style scoped>
  .lobby {
    text-align: center;
    margin-top: 50px;
  }

  .lobby input {
    margin: 2px;
  }

  .choice {
    font-size: 1.3em;
    margin: 20px 0 20px 0;
  }
</style>