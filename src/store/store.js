import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    counter:0
  },
  getters:{
    counterIs: state => {
      return 'カウンターは' + state.counter + 'です。'
    }
  },
  mutations:{
    decrement: state => {
      state.counter--
    }
  }
})
