<template>
  <div class="header" style="margin-bottom:0;">
    <div style="width:100%;height:100%;">
      <div class="header-word">
        <img src="../assets/logowhite.png" style="width:7%;height:7%;float:left;margin-right:-40%;margin-left:35%;margin-top:-1%;" />
        <p style="margin-top:3%;margin-bottom:0;margin-left:11%;">Ai文案</p>
      </div>
<div style="float:center;">
        <a-select
          :maxTagCount="6"
          style="width:35%;"
          mode="tags"
          class="customSelect"
          @change="handleChange"
          placeholder="请输入关键词"
        >
          <a-select-option v-for="i in keywords" :key="i">{{i}}</a-select-option>
        </a-select>
        <a-button
          @click="handleGen"
          slot="suffix"
          class="search-btn"
          style="background:transparent;margin-left:-3.2%;border:none;"
        >
          <a-icon type="smile" spin style="color:black;" />
        </a-button>
      </div>

      <div class="header-item" style="width:55%;margin-left:23.2%; ">
        <div class="aspect" style="width:50%;float:left;">
          <a-radio-group v-model="aspect">
            <a-radio-button class="btn" value="a">外观</a-radio-button>
            <a-radio-button class="btn" value="b">材质</a-radio-button>
            <a-radio-button class="btn" value="c">功能</a-radio-button>
          </a-radio-group>
        </div>

        <div class="length" style="width: 50%;float:right;">
          <a-radio-group v-model="length">
            <a-radio-button class="btn" value="a">短</a-radio-button>
            <a-radio-button class="btn" value="b">中</a-radio-button>
            <a-radio-button class="btn" value="c">长</a-radio-button>
          </a-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import logo from './../assets/logo.png'
import bus from "./Bus.js";
const API = "http://deecamp.tangkailh.cn:10081/";

export default {
  name: "Header",
  props: {
    msg: String
  },

  data() {
    return {
      queryWords: "",
      aspect: "a",
      length: "c",
      keywords: []
    };
  },

  mounted() {
    this.LoadKeyword();
  },

  methods: {
    LoadKeyword() {
      this.$http.get(API + "deecamp_keywords").then(res => {
        // console.log(res.data);
        this.keywords = res.data.slice(0, 100);
      });
    },

    handleChange(value) {
      this.queryWords = value;
    },

    handleGen() {
      let params =
        "keywords=" +
        this.queryWords.join(" ") +
        "&aspects=" +
        this.aspect +
        "&length=" +
        this.length;
      bus.$emit("params_in", params);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  height: 100%;
  width: 100%;
}
.customSelect {
  width: 70%;
}

.header-word {
  width: 100%;
  color: white;

  text-align: center;
  font-size: 600%;
  font:bold;
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
