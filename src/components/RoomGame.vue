<template>
  <form action="javascript:void(0);" class="game pure-form">
    <div class="supresser" style="width:100%">
      <div class="sketchpad static"></div>
    </div>
    <div class="sketchpad dynamic"></div>

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

    import rabisco from '@/rabisco.js';

    let ropad, rwpad;

    function padSetMode(mode) {
        if (mode === 'drawing') {
            rwpad.el.style.display = 'block';
            ropad.el.style.display = 'none';
        } else {
            rwpad.el.style.display = 'none';
            ropad.el.style.display = 'block';
        }
    }

    function padGetValue() {
        // Always get value on dynamic pad. Less consistent/generic, but less risky
        return JSON.stringify(rwpad.toJSON());
    }

    function padSetValue(value) {
        // Always set value on static pad. Less consistent/generic, but less risky
        ropad.loadJSON(JSON.parse(value));
    }

    function padClear() {
      rwpad.clear();
    }

    function padReset(currType, prevValue) {
        padSetMode(currType);
        if (currType === 'description') {
            padSetValue(prevValue);
        }
    }

    function padInit(baseElement) {
        const properties = {
            line: {
                size: 10
            },
            aspectRatio: 0.5625
        };

        // description pad (read only)
        let el = baseElement.querySelector('.sketchpad.static');
        ropad = new Sketchpad(el, properties);
        ropad.el = el;
        // prevent listeners
        let stop = function (event) {
            event.stopPropagation();
        };
        el = baseElement.querySelector('.supresser');
        el.addEventListener('mousedown', stop, true);
        el.addEventListener('touchstart', stop, true);

        el.addEventListener('mousemove', stop, true);
        el.addEventListener('touchmove', stop, true);

        el.addEventListener('mouseup', stop, true);
        el.addEventListener('mouseleave', stop, true);
        el.addEventListener('touchend', stop, true);

        // drawing pad
        el = baseElement.querySelector('.sketchpad.dynamic');
        rwpad = new Sketchpad(el, properties);
        rwpad.el = el;
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
                            // new round clear inputs
                            this.clearInputs();
                        }
                        padReset(newRoom.rounds[1].type, newRoom.rounds[0].value);
                    }
                },
                deep: true
            }
        },
        methods: {
            clearInputs() {
                padClear();
                let textarea = this.$el.querySelector("textarea");
                if (textarea) {
                    textarea.value = '';
                }
            },
            play() {
                let value;
                if (this.room.rounds[1].type === 'drawing') {
                    value = padGetValue();
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
                  .catch(() => this.$notify({type: 'error', text: 'Garrô aqui. Tenta de novo!'}))
            }
        },
        mounted() {
            padInit(this.$el);
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

  .sketchpad.dynamic {
    cursor: crosshair;
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
