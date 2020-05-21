<template>
  <article class="message" :class="todoClass" style="margin-bottom:1.2rem">
    <div class="message-body">
      <div
        class="is-flex"
        style="justify-content:space-between;align-items:center"
        v-if="todo.id!==editid"
      >
        <div class="is-flex" style="align-items:center">
          <input type="checkbox" :checked="todo.done" @click.stop="updateDoneState" />
          <div style="margin:0 0 0 0.8rem;">
            <p style="margin-bottom:0.5rem;" :style="doneStyle">{{todo.title}}</p>
            <p class="tag" :class="todoClass">{{status}}</p>
          </div>
        </div>
        <div>
          <button
            @click="handleDblClick"
            class="button is-link is-small"
            style="margin-right:0.3rem"
          >
            <span class="far fa-edit"></span>
          </button>
          <button class="button is-small is-danger" @click="removeTodoClick">
            <span class="fas fa-times"></span>
          </button>
        </div>
      </div>
      <div v-else>
        <div class="field has-addons">
          <div class="control">
            <input
              type="text"
              class="input is-small"
              placeholder="Enter Title"
              v-model="cache.title"
            />
          </div>
          <div class="control">
            <Datepicker
              v-model="cache.day"
              input-class="input is-small"
              type="date"
              placeholder="Select date"
            />
          </div>
          <div class="control">
            <button class="button is-success is-small" @click="updateTodoClick">Update</button>
          </div>
          <div class="control">
            <button class="button is-danger is-small" @click="sendEditNull">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapActions } from "vuex";
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      cache: {
        ...this.todo
      }
    };
  },
  props: {
    todo: {
      type: Object,
      required: true
    },
    editid: {
      type: [Number, String]
    }
  },
  computed: {
    doneStyle() {
      return this.todo.done
        ? "text-decoration:line-through"
        : "text-decoration:none";
    },
    calculateDate() {
      return (new Date(this.todo.day) - Date.now()) / (1000 * 60 * 60);
    },
    status() {
      if (!this.todo.done) {
        if (this.calculateDate > -48 && this.calculateDate <= -24) {
          return "Due Yesterday";
        } else if (this.calculateDate > -24 && this.calculateDate <= 0) {
          return "Due Today";
        } else if (this.calculateDate > 0 && this.calculateDate <= 24) {
          return "Due Tomorrow";
        }

        return "Due date: " + new Date(this.todo.day).toDateString();
      } else {
        return "Completed";
      }
    },
    todoClass() {
      if (this.todo.done) {
        return "is-success";
      } else {
        if (this.calculateDate > -24) {
          return "is-link";
        }
        return "is-danger";
      }
    }
  },
  methods: {
    ...mapActions(["updateTodo", "removeTodo"]),
    updateDoneState() {
      this.todo.done = !this.todo.done;
      this.updateTodo(this.todo);
    },
    handleDblClick() {
      this.previous = this.todo;
      this.$emit("update-id-event", this.todo.id);
    },
    sendEditNull() {
      this.$emit("update-id-event", null);
    },
    updateTodoClick() {
      let { day } = this.cache
      day = new Date(day)
      this.cache.day = day.toLocaleDateString() + " 12:00 AM";
      this.updateTodo(this.cache)
      this.sendEditNull()
      
    },
    removeTodoClick() {
      this.removeTodo(this.todo.id);
    }
  }
};
</script>

<style scoped>
.message-body {
  padding: 1rem;
  cursor: pointer;
}
</style>