<template>
  <div class="content">
<!--     
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
      </div> -->

    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="Mode 1" key="1">
        <modeone ref="modeone" />
      </a-tab-pane>
      <a-tab-pane tab="Mode 2" key="2">
        <modetwo ref="modetwo" />
      </a-tab-pane>
    </a-tabs>

    <div class="control-gen"></div>
  </div>
</template>

<script>
/* eslint-disable */
import bus from "./Bus.js"
import Basemode from "./Basemode.vue"
import Advancemode from './Advancemode.vue';
const API = "http://deecamp.tangkailh.cn:10081/";

export default {
  name: "Content",
  props: {
    msg: String
  },
  components: { modeone: Basemode, modetwo: Advancemode },
  data() {
    return {
      queryWords: "",
      keywords: [],
      aspect: "a",
    };
  },
  mounted() {
    this.LoadKeyword();
    bus.$on("params_in", (val)=>{
      let params=val 
      window.test = this.$refss
      this.$refs.modeone.reqGenDoc(params)
      this.$refs.modetwo.reqGenSen(params)
    })
  },
  methods: {
    LoadKeyword() {
      this.$http.get(API + "deecamp_keywords").then(res => {
        this.keywords = res.data.slice(0, 100);
      });
    },
    
  },
  filters: {
    capitalize: function(value) {
      console.log("TEST: ", value);
      let maps = {
        ES_result: "基于检索的方法",
        KOBE_result: "基于生成的方法"
      };
      return maps[value];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* div {
  margin: 10px;
} */

.control-res {
  margin: 0 0 20px 0;
  overflow: hidden;
  height: 50%;
}
.control-gen {
  margin: 0 0 20px 0;
}
.content {
  height: 100%;
  margin: auto;
}

h3 {
  margin: 40px 0 0;
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
.res-card {
  /* width: 100%; */
}
</style>
