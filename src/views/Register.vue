<template>
  <BaseContainer style="padding-top:2rem;">
 
    <div class="columns" style="align-items:center;">
      <div class="column is-6">
        <img src="@/assets/registration.png" alt="">
      </div>
      <div class="column is-6">
        <BaseHeading> Register </BaseHeading>
        <p style="margin-bottom:0.8rem">Already have an account ? <router-link :to="{name:'Login'}">Login</router-link></p>
        
        <BaseInput
          type="text"
          v-model="name"
          placeholder="Enter Full Name"
          label="Enter Name"
          required
        />
        <BaseInput
          type="email"
          v-model="email"
          placeholder="Enter Email Address"
          label="Enter Email"
          required
        />
        <BaseInput
          type="password"
          v-model="password"
          placeholder="Enter your password (min: 8 length)"
          label="Enter Password"
          required
        />
        <button class="button is-link" @click="handleRegister">Register</button>
      </div>
     
    </div>
    
  </BaseContainer>
</template>

<script>
import {register} from '@/services/userService'
import NProgress from 'nprogress'
export default {
  data(){
    return{
      name:'',
      email:'',
      password:''
    }
  },
  methods:{
    handleRegister(){
      if(this.name && this.email && this.password){
        NProgress.start()
        const user = {
          name:this.name,
          email:this.email,
          password:this.password
        }
        register(user)
          .then(res=>{
            NProgress.done()
            if(res.status === 200){
              this.$router.push({name:'Login'})
            }
          })
          .catch(err=>{
            console.log(err)
            NProgress.done()
          })
      }
    }
  }

}
</script>

<style>

</style>