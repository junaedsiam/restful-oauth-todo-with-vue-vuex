<template>
  <div class="home">
    <div class="container">
      <div class="columns">
        <div class="column is-9">
          <h1 class="is-size-3 has-text-centered" style="margin-bottom:1.2rem">Todo Application</h1>
          <div class="field has-addons" id="todoAdd">
            <div class="control is-expanded">
              <input type="text" class="input" placeholder="Enter Title" v-model="todo.title" />
            </div>
            <div class="control is-expanded">
                <Datepicker
              v-model="todo.day"
      
              type="date"
              placeholder="Select date"
              input-class="input is-small"
            />
            </div>
            <div class="control">
              <button class="button is-link" @click="addClickMethod">Add Todo</button>
            </div>
          </div>
          <h1 class="is-size-3 has-text-centered">Todo List</h1>
          <p
            class="has-text-centered"
            style="margin-bottom:1.2rem"
          >Click the checkbox for task completion</p>
          <div v-if="todos.length">
            <TodoSingle
              v-for="todo in todos"
              :todo="todo"
              :key="todo.id"
              :editid="editid"
              @update-id-event="updateEditId"
            />
          </div>
          <div v-else class="empty-box">
            <h1 class="is-size-5 has-text-weight-light has-text-centered">Board is Clear</h1>
          </div>
          <!--
            OPERATION SECTION
          -->
          <div class="field has-addons">
            <p class="control">
              <button class="button" @click="markAllDone">
                <span class="icon is-small">
                  <i class="far fa-check-square has-text-success"></i>
                </span>
                <span>Mark All Done</span>
              </button>
            </p>
            <p class="control">
              <button class="button" @click="removeDone">
                <span class="icon is-small">
                  <i class="far fa-times-circle has-text-link"></i>
                </span>
                <span>Remove Completed</span>
              </button>
            </p>
            <p class="control">
              <button class="button" @click="clearAll">
                <span class="icon is-small">
                  <i class="fas fa-times has-text-danger"></i>
                </span>
                <span>Clear All</span>
              </button>
            </p>
          </div>

          <!--
            OPERATION SECTION
          -->
          <div class="footer">
            <hr />
            <p class="has-text-centered has-text-grey-light">@junaedsiam</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { mapState } from "vuex";
import { mapGetters, mapActions } from "vuex";
import store from '@/store'
import TodoSingle from "@/components/TodoSingle";
import Datepicker from "vuejs-datepicker";
import {getTodos} from '@/services/TodoService'
import NProgress from 'nprogress'
export default {
  beforeRouteEnter(to,from,next){
    NProgress.start() 
    getTodos().then(res=>{
      const todos = res.data.data
      store.dispatch('setTodos',todos)
      NProgress.done()
      next()
    })
    .catch(err=>{
      console.log(err.response)
    })
  },
  data() {
    return {
      todo: this.setNewTodo(),
      editid: null
    };
  },
  computed: {
    // ...mapState(["todos"]),
    ...mapGetters({
      todos: "sortedTodos"
    })
  },
  components: {
    TodoSingle,
    Datepicker
  },
  methods: {
    ...mapActions(["addTodo", "markAllDone","removeDone","clearAll"]),
    addClickMethod() {
      if (this.todo.title.length && this.todo.day) {
        this.todo.day = this.todo.day.toLocaleDateString() + " 12:00 AM";
        this.addTodo(this.todo);
        this.todo = this.setNewTodo();
      }
    },
    updateEditId(value) {
      this.editid = value;
    },
    setNewTodo() {
      return {
        title: "",
        day: ""
      };
    }
  }
};
</script>

<style>
.container {
  padding: 1.5rem 0;
}
.columns {
  justify-content: center;
}
#todoAdd {
  margin-bottom: 1.5rem;
}
#todoAdd input {
  font-size: 1rem !important;
}
.empty-box{
  padding:2rem;
  background:#f5f5f5;
  margin-bottom:1.5rem;
}
</style>