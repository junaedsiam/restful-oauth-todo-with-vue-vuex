<template>
  <div class="parent-nav has-background-link has-text-white">
    <BaseContainer>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <p class="subtitle is-5 has-text-white">
            <strong class="has-text-white">
              <router-link :to="{path:'/'}">Todosome</router-link>
            </strong>
          </p>
        </div>
        <div class="level-right" v-if="user.id">
          <div class="dropdown is-active">
            <div class="dropdown-trigger">
              <button class="button is-small is-link is-light" aria-haspopup="true" aria-controls="dropdown-menu" @click="dropdownVisible=!dropdownVisible">
                <span>{{user.name}}</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content" v-if="dropdownVisible">
                <a href="#" class="has-text-link is-size-7" style="padding:0.5rem 1.5rem; display:block;" @click="handleLogout">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="level-right" v-else>
          <p class="level-item">
            <router-link :to="{name:'Login'}" class="button is-danger is-small is-light">Login</router-link>
          </p>
          <p class="level-item">
            <router-link :to="{name:'Register'}" class="button is-info is-small is-light">Register</router-link>
          </p>
        </div>
      </nav>
    </BaseContainer>
  </div>
</template>

<script>
import { mapState,mapActions } from "vuex";
export default {
  data(){
    return{
      dropdownVisible:false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods:{
    ...mapActions(['logout']),
    handleLogout(){
      this.logout();
      this.$router.push({name:'Login'})
      this.dropdownVisible = false
    }
  }
};
</script>

<style>
.parent-nav {
  background: #333;
}
.parent-nav > .container {
  padding: 0.6rem 0;
}
.parent-nav > .container a {
  color: #f5f5f5;
}
</style>