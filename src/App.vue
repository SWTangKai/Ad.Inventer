<template>
  <!-- <div id="app" v-touch:right="onSwipeRight"> -->
  <div id="app">
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  methods: {
      onSwipeRight () {
        this.$router.go(-1)
      }
    }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b0bac4;

  background: #fff7f2;
  height: 100%;
  /* margin-top: 60px; */
}
.cont{
  /* width: 100%;
  height: 500px; */
}
</style>
