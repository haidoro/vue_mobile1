<template>
<div>
  <button class="button" type="button" name="button" @click="show">
    <span class="top"></span>
    <span class="middle"></span>
    <span class="bottom"></span>
  </button>
  <transition>
    <nav id="gnav" class="nav" v-if="gnav">
      <div class="nav__body">
        <ul class="nav__lst">
          <li class="nav__item" v-for="(value,key) in lists"><a :href="value">{{key}}</a></li>
        </ul>
      </div>
    </nav>
    <img :src="image_src">
  </transition>
</div>
</template>

<script>
export default {
  name: 'GrobalNav_sp',
  data () {
    return {
    gnav: false,
    image_src: require("../assets/logo.png"),
    lists: {
      "listItem1":"example/sample1.html",
      "listItem2":"example/sample2.html",
      "listItem4":"example/sample4.html"
      }
    }
  },
  methods: {
    show: function(e){
      let elm = e.currentTarget;
      let className = elm.className;
      if(className.indexOf('is-open') != -1) {
        this.gnav = false;
        elm.className = 'button';
      } else {
        this.gnav = true;
        elm.className += " is-open";
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button{
  display: block;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: none;
  position: relative;
  z-index: 100;
  appearance: none;
  cursor: pointer;
  outline: none;
}

.button.is-open .top{
  transform: rotate(45deg);
}
.button.is-open .middle{
  opacity: 0;
}
.button.is-open .bottom{
  transform: rotate(-45deg);
}
span{
  display: block;
  width: 20px;
  height: 1px;
  margin: auto;
  background-color: #000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: .5s ease;
}
span.top{
  transform: translateY(-6px);
  }
span.bottom{
  transform: translateY(6px);
}
.nav{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #39AF78;
  overflow-y: scroll;
  z-index: 99;
}
.v-enter,
.v-leave-to{
  opacity: 0;
}
.v-enter-to,
.v-leave{
  opacity: 1;
}
.v-enter-active,
.v-leave-active{
  transition: opacity 1s ease;
}
.nav__body{
  padding: 40px;
}
.nav__lst{
  list-style: none;
  padding-left:0;
}
.nav__item{
  font-size: 24px;
  line-height: 1.5;
  font-weight: 700;
}
.nav ~ .nav{
  margin-top: 8px;
}
a{
  color: #fff;
  padding: 8px 0;
}
.text{
  position: absolute;
  top: 0;
  left: 60px;
}
</style>
