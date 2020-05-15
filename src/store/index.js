import Vue from 'vue'
import Vuex from 'vuex'
import {sortBy} from 'lodash'
Vue.use(Vuex)
import * as TodoService from '@/services/TodoService'
import NProgress from 'nprogress'

export default new Vuex.Store({
  state: {
    todos:[]
  },
  mutations: {
    SET_TODOS(state,payload){
      state.todos = payload
    },
    ADD_TODO(state,payload){
      state.todos.push(payload)
    },
    REMOVE_TODO(state,payload){
      state.todos = state.todos.filter(todo=>todo.id!==payload)
    },
    UPDATE_TODO(state,{index,data}){
      state.todos.splice(index,1,data)
    },
    MARK_ALL_DONE(state){
      state.todos = state.todos.map(todo=>{
        todo.done = true;
        return todo;
      }) 
    },
    REMOVE_DONE(state){
      state.todos = state.todos.filter(todo=>todo.done!==true)
    },
    CLEAR_ALL(state){
      state.todos = []
    }
  },
  actions: {
    addTodo({commit},payload){
      NProgress.start()
      TodoService.addTodo(payload)
        .then(res=>{
          commit('ADD_TODO',res.data.data)
          NProgress.done()
        }).catch(err=>{
          console.log(err.response)
        })
      
    },
    removeTodo({commit},payload){
      NProgress.start()
      TodoService.removeTodo(payload)
        .then((res)=>{
          if(res.status==204){
            NProgress.done()
            commit('REMOVE_TODO',payload)
          }
        })
        .catch(err=>console.log(err.response))
    },
    updateTodo({commit,state},payload){
      NProgress.start()
      TodoService.updateTodo(payload)
        .then(res=>{
          const {data} = res.data 
          const index = state.todos.findIndex(todo=>todo.id===data.id)
          NProgress.done()
          commit('UPDATE_TODO',{index,data})
        })
        .catch(err=>{
          console.log(err.response)
        })
    },
    markAllDone({commit}){
      NProgress.start()
      TodoService.markAllDone()
        .then(res=>{
          if(res.status==204){
            NProgress.done()
            commit('MARK_ALL_DONE')
          }
        })
    },
    removeDone({commit}){
      NProgress.start()
      TodoService.deleteDone()
        .then(res=>{
          if(res.status == 204){
            NProgress.done()
            commit('REMOVE_DONE')
          }
        }).catch(err=>console.log(err.response))
    },
    clearAll({commit}){
      NProgress.start()
      TodoService.clearAll()
        .then(res=>{
          if(res.status==204){
            NProgress.done()
            commit('CLEAR_ALL')
          }
        }).catch(err=>console.log(err.response))
    },
    setTodos({commit},payload){
      commit('SET_TODOS',payload)
    }
  },
  getters:{
    sortedTodos: (state)=>{
      return sortBy(state.todos,[function(todo){
        return new Date(todo.day)
      }])
    }
  }
})
