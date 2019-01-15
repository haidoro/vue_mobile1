<template>
  <ul class="gnav">
    <li v-for="(value,key) in lists"><a :href="value">{{key}}</a></li>
  </ul>
</template>

<script>

export default {
  name: 'GrobalNav_sp',
  data () {
    return {
      lists: {
        "listItem1":"example/sample1.html",
        "listItem2":"example/sample2.html",
        "listItem4":"example/sample4.html",
          }
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
  display:block;
  width:100%;
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
  border-bottom:1px solid #fff;
}
li:first-child a{
  border-top:1px solid #fff;
}

</style>
