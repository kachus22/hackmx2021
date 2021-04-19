<template>
  <div class="ballot-options">
    <!-- <ballot-option :name="'Partido Revolucionario institucional'"/> -->
    
    <ballot-option v-for="(o, i) in options" v-bind:key="i"
      :name="o.id" :candidates="o.candidates" />
  </div>
</template>

<style scoped>
  .ballot-options {
    margin: 3rem auto;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 8px;
    background-color: rgb(244, 244, 244);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }

  @media only screen and (max-width: 1080px){
    .ballot-options {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media only screen and (max-width: 750px){
    .ballot-options {
      grid-template-columns: 1fr;
    }
  }
</style>

<script>
import BallotOption from "./BallotOption.vue";

export default {
  name: "ballot",
  props: ['options'],
  methods: {
    
  },
  components: {
    BallotOption
  },
};
</script>
