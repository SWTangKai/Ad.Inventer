<template>
  <div class="header" >

    <div class="header-item">
      
      <img src="../assets/logowhite.png" style="height: 80%; margin: auto; float: left"/>

      <div class="control-aspect" >
        <div class="aspect">
          <a-radio-group v-model="aspect">
            <a-radio-button value="a">外观</a-radio-button>
            <a-radio-button value="b">材质</a-radio-button>
            <a-radio-button value="c">功能</a-radio-button>
          </a-radio-group>
          <a-button @click="handleGen" style="margin-left: 10px">文案生成</a-button>
        </div>
      </div>

      <div class="control-search">
        <a-select mode="tags" style="width: 80%;" @change="handleChange" placeholder="请输入关键词">
          <a-select-option v-for="i in keywords" :key="i">{{i}}</a-select-option>
        </a-select>
        <a-button @click="handleGen" slot="suffix" class="search-btn" type="primary">
          <a-icon type="smile" spin />
        </a-button>
      </div>
    
    </div>
  </div>
</template>

<script>
// import logo from './../assets/logo.png'
import bus from './Bus.js'
export default {
  name: "Header",
  props: {
    msg: String
  },
  data() {
    return {
      queryWords:"",
      aspect: "a",
      keywords: []
    }
  },
  methods:{
    handleChange(value){
      this.queryWords = value;
    },

    handleGen(){
      let params = "keywords="+this.queryWords.join(" ")+"&aspects="+this.aspect
      bus.$emit("params_in", params)
    }
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
.control-aspect {
  /* margin: 0 0 20px 0; */
  height: 70%;
  float:right
}
.control-search {
  height: 100%;
  width:  70%;
  /* margin: 0 0 0 70px; */
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
