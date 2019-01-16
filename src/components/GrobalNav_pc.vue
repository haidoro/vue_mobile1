<template>
<div>
  <img :src="image_src">
  <ul class="gnav">
    <li v-for="(value,key) in lists"><a :href="value">{{key}}</a></li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'GrobalNav_pc',
  data () {
    return {
      lists: {
        "listItem1":"example/sample1.html",
        "listItem2":"example/sample2.html",
        "listItem3":"example/sample3.html",
        "listItem4":"example/sample4.html",
      },
      image_src: require("../assets/logo.png")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{
  width:100%;
  padding:0;
  background-color: #2F4053;
}
li{
  display:inline-block;
  width:20%;
  line-height:50px;
}
li a{
  color:#fff;
  background-color: #39AF78;
  display:block;
  text-decoration: none;
}
li a:hover{
  background-color: lightblue;
  color: #2F4053;
}
li a{
  border-right:1px solid #fff;
}
li:first-child a{
  border-left:1px solid #fff;
}

</style>
