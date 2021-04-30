<template>
  <div id="app">
    <header>

    </header>
        <!-- <p><router-link to="/">Home</router-link>&nbsp; -->
        <!-- <router-link to="/castBallot">Cast Ballot</router-link>&nbsp;
        <router-link to="/QueryAll">QueryAll</router-link></p>
        <router-link to="/queryWithQueryString">Query by Type</router-link>&nbsp;
        <router-link to="/queryByKey">Query by Key</router-link>&nbsp;
        <router-link to="/getCurrentStanding">Get Poll Standings</router-link>&nbsp; -->
      
      <router-view></router-view>
    </div>
</template>

<style scoped>
  header {
    background-image: url("./assets/background.jpeg");
    background-size: contain;
    background-position: center top;
    height: 250px;
  }
</style>

<script>

export default {
  name: 'app'  
}
</script>

<style>
body {
  padding: 0px;
  margin: 0px;
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
</style>
