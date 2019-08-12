<template>
  <div class="header" >

    <div class="header-item">
      
      <img src="../assets/logowhite.png" style="height: 70%; margin: auto; float: left"/>
    </div>
  </div>
</template>

<script>
// import logo from './../assets/logo.png'

export default {
  name: "Header",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
    height: 100%;
    widows:  100%;
    /* background: pink; */
}
.header-item {
  height: 100%;
  width: 100%;
  /* background: pink; */
  float: left;
  color: grey;
  font-size: large;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
