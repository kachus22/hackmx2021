<template>
  <div>
    <div class="ballot-options">
      <ballot-option v-for="(o, i) in options" v-bind:key="i" :votableItem="o" :selected.sync="selected" />
    </div>

    <v-btn class="white--text" color="rgb(241 35 164)"  v-if="selected" @click="onClick" style="font-size: 40px; margin-top: 15px; margin-bottom: 15px; padding: 50px;">
      Votar
    </v-btn>
  </div>
</template>

<style scoped>
  .ballot-options {
    margin: 0 auto;
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
  data() {
    return {
      selected: { votableId: null }
    }
  },
  methods: {
    onClick() {
      this.$emit('vote', this.selected);
    }
  },
  components: {
    BallotOption
  },
};
</script>
