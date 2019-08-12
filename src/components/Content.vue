<template>
  <div class="content">
    <div class="control-aspect">
      <div class="aspect">
        <a-radio-group v-model="aspect">
          <a-radio-button value="a">外观</a-radio-button>
          <a-radio-button value="b">材质</a-radio-button>
          <a-radio-button value="c">功能</a-radio-button>
        </a-radio-group>
      </div>
    </div>

    <div class="control-search">
      <a-select mode="tags" style="width: 80%;border-radius: 100px;" @change="handleChange" placeholder="请输入关键词" allowClear>
        <a-select-option v-for="i in keywords" :key="i">{{i}}</a-select-option>
      </a-select>
      <a-button @click="handleGen" slot="suffix" class="search-btn" type="primary">
        <a-icon type="smile" spin />
      </a-button>
    </div>

    <a-tabs defaultActiveKey="1" @change="callback" style="background:lightblue; border-top-left-radius:10%;border-top-right-radius:10%">
      <a-tab-pane tab="功能一" key="1">
        <modeone ref="modeone" />
      </a-tab-pane>
      <a-tab-pane tab="功能二" key="2">
        <modetwo ref="modetwo" />
      </a-tab-pane>
    </a-tabs>

    <div class="control-gen"></div>
  </div>
</template>


<script>
/* eslint-disable */
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
  },
  methods: {
    LoadKeyword() {
      this.$http.get(API + "deecamp_keywords").then(res => {
        // console.log(res.data);
        this.keywords = res.data.slice(0, 100);
      });
    },
    handleChange(value) {
      // console.log(`selected ${value}`);
      this.queryWords = value;
    },
    handleGen() {
      let params = "keywords="+this.queryWords.join(" ")+"&aspects="+this.aspect
      window.test = this.$refss
      this.$refs.modeone.reqGenDoc(params)
      this.$refs.modetwo.reqGenSen(params)
    }
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

.control-aspect {
  margin: 0 0 20px 0;
}
.control-search {
  margin: 0 0 20px 0;
}
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
