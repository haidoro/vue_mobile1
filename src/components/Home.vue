<template>
  <div id="app">
    <gnav-sp v-if="mobile" />
    <gnav-pc v-else />
    <p>{{name}}さん、こんにちは。</p>
    <hello-world :myName = "name" @nameReset = "name = $event"/>
    <form-content />
    <my-counter />
    <p>Counter is : {{ counter }}</p>

  </div>
</template>

<script>
import HelloWorld from './HelloWorld'
import GrobalNav_pc from './GrobalNav_pc'
import GrobalNav_sp from './GrobalNav_sp'
import FormContent from './FormContent'
import Counter from './Counter'

export default {
  name: 'Home',
  components: {
    'hello-world':HelloWorld,
    'gnav-pc':GrobalNav_pc,
    'gnav-sp':GrobalNav_sp,
    'form-content':FormContent,
    'my-counter':Counter
  },
  data(){
    return{
      mobile:false,
      name:'Tahara'
    }
  },
  computed:{
    counter(){
      return this.$store.state.counter
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

