<template>
  <div class="showcase">
    <div class="text" v-if="round.type === 'description'">{{round.value}}</div>
    <div class="sketchpad" v-if="round.type === 'drawing'"></div>
  </div>
</template>

<script>
    import Sketchpad from "responsive-sketchpad";

    import {properties as padProperties} from "@/mixins/sketchpad";

    export default {
        name: "RoomShowcaseItem",
        props: {
            round: {
                type: Object,
                required: true
            }
        },
        mounted() {
            let el = this.$el.querySelector(".sketchpad");
            if (el) {
                let pad = new Sketchpad(el, padProperties);
                pad.loadJSON(JSON.parse(this.round.value));
            }
        }
    };
</script>

<style scoped>
  .text {
    margin: 1em 0 1em 0;
    font-family: 'Courgette', cursive;
    font-size: 1.4em;
    color: #505050;
  }
  .sketchpad {
    border: 1px solid #eee;
    max-width: 600px;
  }
</style>