<template>
  <form action="javascript:void(0);" class="game pure-form">
    <div class="sketchpad"></div>

    <textarea v-if="room.rounds[1].type === 'description'" class="value"
              placeholder="Descreva o desenho acima"></textarea>
    <div v-if="room.rounds[1].type === 'drawing'" class="description static">{{ room.rounds[0].value }}</div>

    <div class="control">
      <button @click="play()" class="pure-button pure-button-primary">Terminei</button>
      <button @click="clearInputs()" class="button-error pure-button">Apaga tudo</button>
    </div>
  </form>
</template>
<script>
    import Sketchpad from 'responsive-sketchpad';

    import {properties as padProperties} from '@/mixins/sketchpad';
    import rabisco from '@/mixins/rabisco';

    let pad;

    function padReset(mode, prevValue) {
        if (mode === 'drawing') {
            pad.clear();
            pad.el.style.cursor = 'crosshair';
            pad.setReadOnly(false);
        } else {
            pad.setReadOnly(true);
            pad.loadJSON(JSON.parse(prevValue));
            pad.el.style.cursor = 'initial';
        }
    }

    export default {
        name: 'Game',
        props: {
            room: {
                type: Object,
                required: true
            }
        },
        watch: {
            "room": {
                handler(newRoom, prevRoom) {
                    // no need to redraw everything if nothing really changed
                    if (!this.$_.isEqual(newRoom, prevRoom)) {
                        if (newRoom.round > prevRoom.round) {
                            // new round reset pad. The textarea field is reactive, no need to change.
                            padReset(newRoom.rounds[1].type, newRoom.rounds[0].value);
                        }
                    }
                },
                deep: true
            }
        },
        methods: {
            clearInputs() {
                if (this.room.rounds[1].type === 'drawing') {
                    pad.clear();
                } else {
                    let textarea = this.$el.querySelector("textarea");
                    if (textarea) {
                        textarea.value = '';
                    }
                }
            },
            play() {
                let value;
                if (this.room.rounds[1].type === 'drawing') {
                    value = JSON.stringify(pad.toJSON());
                } else {
                    value = this.$el.querySelector('textarea').value;
                }
                const round = {
                    type: this.room.rounds[1].type,
                    value: value,
                    round: this.room.rounds[1].round
                };
                rabisco.play(this.room.id, round)
                  .then(() => this.$notify({type: 'success', text: 'Muito bem! Enviado!'}))
                  .catch(() => this.$notify({type: 'error', text: 'Garrô aqui. Tenta de novo!'}));
            }
        },
        mounted() {
            pad = new Sketchpad(this.$el.querySelector('.sketchpad'), padProperties);
            padReset(this.room.rounds[1].type, this.room.rounds[0].value);
        }
    };
</script>
<style scoped>
  .game {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
  }

  .sketchpad {
    border: 1px solid #eee;
    width: 100%;
  }

  textarea {
    margin: 1em 0 1em 0;
    width: 100%;
    height: 80px;
  }

  .description {
    margin: 1em 0 1em 0;
    font-family: 'Courgette', cursive;
    font-size: 1.4em;
    color: #505050;
  }

  .control {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
  }

  button {
    margin: 2px;
  }

  .button-error {
    color: white;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    background-color: #e05050;
  }
</style>
