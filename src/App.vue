<template>
  <div id="app">
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-header class="layout-header"><Header/></a-layout-header>
      <a-layout-content><Content /></a-layout-content>
      <!-- <a-layout-footer><Footer/></a-layout-footer> -->
    </a-layout>
    
    
  </div>
</template>

<script>
import Content from './components/Content.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Header,
    Content,
    Footer
  }
}
</script>

<style scoped>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b0bac4;
  height: 100%;
  /* margin-top: 60px; */
}

#components-layout-demo-top{
  height: 100%;
}

.layout-header{
    background: rgb(240, 242, 245);
    margin-top: 20px;
    margin-bottom: 7px;
}

</style>
