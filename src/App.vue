<template>
  <div id="app">
    <img src="./assets/logo.png">
    <GrobalNav_sp v-if="mobile"/>
    <GrobalNav_pc v-else />
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import GrobalNav_pc from './components/GrobalNav_pc'
import GrobalNav_sp from './components/GrobalNav_sp'

export default {
  name: 'App',
  components: {
    HelloWorld,
    GrobalNav_pc,
    GrobalNav_sp
  },
  data(){
    return{
      mobile:false
    }
  },
  created: function () {
    const isMobile = require('ismobilejs');
    this.mobile = isMobile.phone;
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
