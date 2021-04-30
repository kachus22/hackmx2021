<template>
  <v-app>
    <header>

    </header>

    <!-- <router-link to="/castBallot">Cast Ballot</router-link>&nbsp; -->
        <!-- <router-link to="/QueryAll">QueryAll</router-link>
        <router-link to="/queryWithQueryString">Query by Type</router-link>&nbsp;
        <router-link to="/queryByKey">Query by Key</router-link>&nbsp;
        <router-link to="/results">Get Poll Standings</router-link>&nbsp; -->

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style>
body {
  padding: 0px;
  margin: 0px;
}
header {
  background-image: url("./assets/background.jpeg");
  background-size: contain;
  background-repeat: repeat-x;
  background-position: center top;
  height: 200px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.chart-wrapper {
  width: 100%;
  height: 700px;
}
.echarts {
  width: 100%;
  height: 100%;
}

#loader {
  position:fixed;
  padding-top: 250px;
}

.chart-wrapper {
  position:fixed;
  padding-left:32%;
}

.v-rise {
  background-color: rgb(241 35 164) !important;
}
</style>