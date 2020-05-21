import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NProgress from 'nprogress'
import store from '@/store'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props:true
  },
  {
    path: '/register',
    name: 'Register',
    component:()=>import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    meta:{guest:true}
  },
  {
    path: '/login',
    name: 'Login',
    component:()=>import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta:{guest:true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  
  NProgress.start()
  store.dispatch('loggedIn')
    .then(()=>{
      if(to.matched.some(record=>record.meta.guest)){
          NProgress.done()
          next({name:'Home'})
      }else{
        to.params.loggedIn = true;
        NProgress.done()
        next()
      }
    })
    .catch(()=>{
      NProgress.done()
      next()
    })

});


export default router
