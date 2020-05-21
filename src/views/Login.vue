<template>
  <BaseContainer style="padding-top:2rem;">
    <div class="columns" style="align-items:center;">
      <div class="column is-6">
        <img src="@/assets/login.png" alt />
      </div>
      <div class="column is-6">
        <BaseHeading>Login</BaseHeading>
        <p style="margin-bottom:0.8rem">
          Not have an account ?
          <router-link :to="{name:'Register'}">Register</router-link>
        </p>

        <BaseInput
          type="email"
          v-model="cr.email"
          placeholder="Enter Email Address"
          label="Enter Email"
          required
        />
        <BaseInput
          type="password"
          v-model="cr.password"
          placeholder="Enter your password (min: 8 length)"
          label="Enter Password"
          required
        />
        <button class="button is-link" @click="loginAttempt">Login</button>
      </div>
    </div>
  </BaseContainer>
</template>

<script>
import { mapActions } from "vuex";
import NProgress from "nprogress";
export default {
  data() {
    return {
      cr: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginAttempt() {
      if (this.cr.email && this.cr.password) {
        NProgress.start();
        this.login(this.cr)
          .then(res => {
            if (res) {
              this.$router.push({ name: "Home" });
            }
          })
          .catch(err => console.log(err));
      }
    }
  }
};
</script>

<style>
</style>