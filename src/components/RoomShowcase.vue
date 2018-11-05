<template>
  <div class="showcase">
    <secondary-header title="Resultados"/>
    <room-showcase-item v-for="round in room.rounds" :round="round" :key="round.value"/>
    <form action="javascript:void(0);" class="pure-form">
      <button @click="nextScore()" class="pure-button pure-button-primary">Próximo</button>
    </form>
  </div>
</template>

<script>
    import RoomShowcaseItem from "@/components/RoomShowcaseItem.vue";
    import SecondaryHeader from "@/components/SecondaryHeader.vue";

    export default {
        name: "RoomShowcase",
        props: {
            room: {
                type: Object,
                required: true
            }
        },
        components: {
            'room-showcase-item': RoomShowcaseItem,
            'secondary-header': SecondaryHeader
        },
        methods: {
            nextScore() {
                this.$emit('next-score');
                let button = this.$el.querySelector('button');
                button.disabled = true;
                setTimeout(() => button.disabled = false, 2000);
            }
        }
    };
</script>

<style scoped>

</style>