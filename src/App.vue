<template>
  <div id="app">
    <gnav-sp v-if="mobile" />
    <gnav-pc v-else />
    <p>{{name}}さん、こんにちは。</p>
    <hello-world :myName = "name" @nameReset = "name = $event"/>
    <form-content />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import GrobalNav_pc from './components/GrobalNav_pc'
import GrobalNav_sp from './components/GrobalNav_sp'
import FormContent from './components/FormContent'

export default {
  name: 'App',
  components: {
    'hello-world':HelloWorld,
    'gnav-pc':GrobalNav_pc,
    'gnav-sp':GrobalNav_sp,
    'form-content':FormContent
  },
  data(){
    return{
      mobile:false,
      name:'Tahara'
    }
  },
  created: function () {
    const isMobile = require('ismobilejs');
    this.mobile = isMobile.phone;
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 10px;
}
p{
  text-align: left;
}
</style>
