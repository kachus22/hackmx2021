<template>
  <div class="ballot-single-option">
    <div class="image">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Morena_logo_%28alt%29.svg/1200px-Morena_logo_%28alt%29.svg.png" 
        v-bind:alt="`${name} Logo`">
    </div>
    <div class="info">
      <h2>{{name}}</h2>
      <h4 v-for="(c, i) in candidates" v-bind:key="i">{{c}}</h4>
    </div>
  </div>
</template>

<style scoped>
  .ballot-single-option {
    padding: 10px;
    border: 1px solid black;
    background-color: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .ballot-single-option .image img {
    height: 130px;
    width: 130px;
    margin: 0px 20px;
  }

  .ballot-single-option .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .ballot-single-option .info h2 {
    margin-top: 0px;
    margin-bottom: 15px;
    border-bottom: 1px solid rgb(185, 185, 185);
  }

  .ballot-single-option .info h4 {
    margin-block-start: 0.1em;
    margin-block-end: 0.1em;
  }

  .ballot-single-option .info h4:last-child {
    margin-top: 15px;
  }
</style>

<script>

export default {
  name: "ballot-option",
  props: ['name', 'candidates'],
  methods: {
    
  }
};
</script>
