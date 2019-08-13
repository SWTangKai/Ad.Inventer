<template>
  <div class="content">
    <div class="control-aspect ">
      <div class="aspect">
        <a-radio-group v-model="aspect">
          <a-radio-button value="1">外观</a-radio-button>
          <a-radio-button value="2">材质</a-radio-button>
          <a-radio-button value="3">功能</a-radio-button>
        </a-radio-group>
        <a-button @click="handleGen" style="margin-left: 10px;">文案生成</a-button>
      </div>
    </div>
    <div class="control-search ">
      <a-select
        :maxTagCount="3"
        size="large"
        mode="tags"
        style="width: 90%; "
        class="customSelect"
        @change="handleChange"
        placeholder="请输入关键词"
      >
        <a-select-option v-for="i in keywords" :key="i">{{i}}</a-select-option>
      </a-select>
      <a-button
        ghost
        style="position: absolute; border: #fff; height: 100%;"
        @click="handleGen"
        slot="suffix"
        class="search-btn"
        type="primary"
      >
        <a-icon type="smile" spin />
      </a-button>
    </div>
    <div class="main-content ">
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="Mode 1" key="1">
          <modeone ref="modeone" />
        </a-tab-pane>
        <a-tab-pane tab="Mode 2" key="2" forceRender>
          <modetwo ref="modetwo" />
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Basemode from "./Basemode.vue";
import Advancemode from "./Advancemode.vue";
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
      aspect: "1",
      length: "c"
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
      let params =
        "keywords=" + this.queryWords.join(" ") + "&aspects=" + this.aspect + "&length=" + this.length;
      this.$refs.modeone.reqGenDoc(params);
      this.$refs.modetwo.reqGenSen(params);
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
  position: relative;
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
.search-btn {
  /* float: left; */
  transform: translateX(-100%);
}
.main-content {
  background: rgb(255, 255, 255);
  border-radius: 30px;
}

.main-content-close {
  transform: translateY(100%);
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

.close{
  transform: translateY(100%);
}
</style>
<style lang="less">
.customSelect {
    :global {
      .ant-select-selection {
        border-radius: 30px;
      }
    }
  }
</style>