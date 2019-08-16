<template>
  <div class="hello">
      <h1>{{ msg }}</h1>
      <button @click="go">点我跳转</button>
  </div>
</template>

<script>
/* eslint-disable */ 
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '哈哈'
    }
  },

  methods: {
    go() {
      this.$router.push('/')
  	}
  }
}
</script>