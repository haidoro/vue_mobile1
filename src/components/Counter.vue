<template>
  <div class="counter">
    <h2>カウンター（Vuex）</h2>
    <button class="btn" @click="increment">Increment</button>
    <button class="btn" @click="decrement">Decrement</button>
  </div>
</template>

<script>
export default {
  methods:{
    increment(){
      this.$store.state.counter++
    },
    decrement(){
      this.$store.commit('decrement')
    }
  }
}
</script>

<style scoped>

</style>
