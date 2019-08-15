<template>
  <div id="app">
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-header class="layout-header"><Header/></a-layout-header>
      <a-layout-content class="layout-content"><Content /></a-layout-content>
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
  height: 100%;
   
  /* margin-top: 60px; */
}

#components-layout-demo-top{
  
  background-image:url('./assets/pic.jpg');
  background-repeat: repeat-y;
  height: 100%;
  background-color: #fafafa00 
  /* background:rgb(206, 214, 224); */
}
.layout-content{
 background: rgba(255,255, 255,0.5);
 
}
.layout-header{
  /* background-image:url('./assets/pic.jpg');
  background-repeat: repeat-y; */
  /* background:rgb(50, 190, 37); */
  height:30%;
  background:transparent;
}
</style>
