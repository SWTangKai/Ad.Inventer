<template>
  <div class="content">
    <a-tabs defaultActiveKey="1" @change="callback">
      <a-tab-pane tab="Mode 1" key="1">
        <modeone ref="modeone" />
      </a-tab-pane>
      <a-tab-pane tab="Mode 2" key="2" forceRender>
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
      // keywords: [],
      // aspect: "a",
    };
  },
  mounted() {

    bus.$on("params_in", (val)=>{
      let params=val 
      window.test = this.$refss
      this.$refs.modeone.reqGenDoc(params)
      this.$refs.modetwo.reqGenSen(params)
    })
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
