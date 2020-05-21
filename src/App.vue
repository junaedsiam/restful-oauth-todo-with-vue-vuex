<template>
  <div id="app">
    <TheNavigation />
    <router-view></router-view>
    <TheFooter />
  </div>
</template>

<script>
import 'nprogress/nprogress.css'
import TheNavigation from '@/components/TheNavigation'
import TheFooter from '@/components/TheFooter'
export default {
  components:{
    TheNavigation,
    TheFooter
  }
}
</script>

<style>
  .footer{
    padding: 3rem 1.5rem 3rem;
  }
</style>