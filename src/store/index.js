import Vue from 'vue'
import Vuex from 'vuex'
import * as todo from './modules/todo'
import * as user from './modules/user'


Vue.use(Vuex)
export default new Vuex.Store({
  modules:{
    todo,
    user
  }
})
