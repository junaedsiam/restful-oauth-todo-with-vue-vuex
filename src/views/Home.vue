<template>
  <div class="home">
    <BaseContainer style="padding-top:2rem;">
      <div class="auth-parent" v-if="loggedIn">
        <h1 class="is-size-3 has-text-centered">Todo Application</h1>
        <p
          class="has-text-link has-text-centered"
          style="margin-bottom:1.2rem"
        >Date Today : {{new Date().toDateString() }}</p>
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
      </div>
      <div class="auth-parent" v-else>
        <img
          src="@/assets/todo-viewer.png"
          alt="todosome!"
          style="max-width:256px; margin:auto; display:block;"
        />
        <h1 class="is-size-2 has-text-weight-regular has-text-link has-text-centered">Todosome!</h1>
        <p
          class="is-size-5 has-text-weight-light has-text-centered"
        >Welcome to the world of Todosome ! This application is totally free to use ! Login / Create an account, and access the world of Todosome !</p>
        <p class="has-text-centered" style="margin-top:1.5rem">
          <router-link
            :to="{name:'Register'}"
            class="button is-link"
            style="margin-right:0.7rem;"
          >Register</router-link>
          <router-link :to="{name:'Login'}" class="button is-danger">Login</router-link>
        </p>
      </div>
    </BaseContainer>
  </div>
</template>

<script>
//import { mapState } from "vuex";
import { mapGetters, mapActions } from "vuex";
import store from "@/store";
import TodoSingle from "@/components/TodoSingle";
import Datepicker from "vuejs-datepicker";
import { getTodos } from "@/services/TodoService";
import NProgress from "nprogress";
export default {
  props: {
    loggedIn: {
      type: Boolean
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.loggedIn) {
      NProgress.start();
      getTodos()
        .then(res => {
          const todos = res.data.data;
          store.dispatch("setTodos", todos);
          NProgress.done();
          next();
        })
        .catch(err => {
          console.log(err.response);
        });
    }else{
      next()
    }

  },
  data() {
    return {
      todo: this.setNewTodo(),
      editid: null
    };
  },
  computed: {
    ...mapGetters({
      todos: "sortedTodos"
    })
  },
  components: {
    TodoSingle,
    Datepicker
  },
  methods: {
    ...mapActions(["addTodo", "markAllDone", "removeDone", "clearAll"]),
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
#todoAdd {
  margin-bottom: 1.5rem;
}
#todoAdd input {
  font-size: 1rem !important;
}
.empty-box {
  padding: 2rem;
  background: #f5f5f5;
  margin-bottom: 1.5rem;
}
</style>