<template>
  <div class="header" >

    <div class="header-item">
      
      <img src="../assets/logowhite.png" style="height: 90%; margin: auto; float: left"/>


      <div class="control-search float-box">
        <!-- <a-select mode="tags" style="width: 80%;" @change="handleChange" placeholder="请输入关键词"> -->
        <a-select
          :maxTagCount="6"
          style="width: 80%; height:100%"
          mode="tags"
          class="customSelect"
          @change="handleChange"
          placeholder="请输入关键词"
        >
          <a-select-option v-for="i in keywords" :key="i">{{i}}</a-select-option>
        </a-select>
        <a-button @click="handleGen" slot="suffix" class="search-btn" type="primary">
          <a-icon type="smile" spin />
        </a-button>
      </div>

      <div class="control-aspect "  style="width: 40%;  float: right">
        <div class="aspect float-box" style="width: 50%;">
          <a-radio-group v-model="aspect">
            <a-radio-button value="a">外观</a-radio-button>
            <a-radio-button value="b">材质</a-radio-button>
            <a-radio-button value="c">功能</a-radio-button>
          </a-radio-group>
        </div>

        <div class="length float-box" style="width: 50%;" >
          <a-radio-group v-model="length">
            <a-radio-button value="a">短</a-radio-button>
            <a-radio-button value="b">中</a-radio-button>
            <a-radio-button value="c">长</a-radio-button>
          </a-radio-group>
        </div>
      </div>


    
    </div>
  </div>
</template>

<script>
// import logo from './../assets/logo.png'
import bus from './Bus.js'
const API = "http://deecamp.tangkailh.cn:10081/";

export default {
  name: "Header",
  props: {
    msg: String
  },

  data() {
    return {
      queryWords:"",
      aspect: "a",
      length: "c",
      keywords: []
    }
  },

  mounted(){
    this.LoadKeyword();
  },

  methods:{
     LoadKeyword() {
      this.$http.get(API + "deecamp_keywords").then(res => {
        // console.log(res.data);
        this.keywords = res.data.slice(0, 100);
      });
    },

    handleChange(value){
      this.queryWords = value;
    },

    handleGen(){
      let params = "keywords="+this.queryWords.join(" ")+"&aspects="+this.aspect+"&length="+this.length
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
  height: 30%;
  float:right
}
.control-search {
  height: 100%;
  width:  50%;
  /* margin: 0 0 0 70px; */
}

.float-box{
  float: left;
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
