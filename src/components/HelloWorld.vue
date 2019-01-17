<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>Hello!{{myName}}</p>
    <button @click = "resetName">Reset Name</button>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <hr>
    <p class="text-center"><button @click="show = !show">switch</button></p>
    <transition appear enter-active-class="animated bounce" leave-active-class="animated shake">
    <img :src="image_src" v-if="show">
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to MyPage!',
      image_src: require("../assets/dog01.png"),
      show:true
    }
  },
  props:{
    myName : {
      type: String,
      // required:true
      default:'Hoge'
    }
  },
  methods:{
    resetName(){
      this.myName = 'Hoge';
      this.$emit('nameReset',this.myName);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.text-center{
  text-align:center
}
</style>
