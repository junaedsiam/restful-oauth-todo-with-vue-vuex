<template>
  <div class="field">
      <label class="label" v-if="label">{{label}}</label>
      <input class="input" v-bind="$attrs" @input="emitEvent">
  </div>
</template>

<script>
export default {
    inheritAttrs:false,
    props:{
        label:{
            type:String,
        },
        value:{
            type:[Number,String]
        }
    },
    methods:{
        emitEvent(event){
            this.$emit('input',event.target.value)
        }
    }
}
</script>

<style>

</style>