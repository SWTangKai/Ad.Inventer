<template>
  <div class="content">
    <div class="header">
      <div class="header-item">
        <div class="logo-svg">
          <!-- <Logo class="logo" preserveAspectRatio="xMinYMin meet" /> -->
          <img src="../assets/logo-white.png" />
        </div>
        <div class="control-search">
          <a-select
            :defaultValue="queryWords"
            :maxTagCount="3"
            size="large"
            mode="tags"
            class="customSelect customTransSelect"
            @change="handleChange"
            placeholder="请输入关键词"
          >
            <a-select-option v-for="i in keywords" :key="i">{{i}}</a-select-option>
          </a-select>
          <a-button ghost @click="handleGen" slot="suffix" class="search-btn" type="primary">
            <a-icon type="arrow-right" />
          </a-button>
        </div>
      </div>
    </div>
    <div class="main-content">
      <a-tabs defaultActiveKey="1" @change="callback" class="customTab">
        <a-tab-pane tab="文不加点" key="1">
          <modeone ref="modeone" />
        </a-tab-pane>
        <a-tab-pane tab="寻章摘句" key="2" forceRender>
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
import Logo from "../assets/svg/logo.svg";
const API = "http://deecamp.tangkailh.cn:10081/";

export default {
  name: "Content",
  props: {
    msg: String
  },
  components: { modeone: Basemode, Logo, modetwo: Advancemode },
  data() {
    return {
      queryWords: [],
      keywords: [],
      aspect: "a",
      length: "c"
    };
  },
  mounted() {
    this.queryWords = this.$route.query.words;
    this.LoadKeyword();
    this.handleGen();
  },
  methods: {
    LoadKeyword() {
      // TODO: fix
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
      let params = "keywords=" + this.queryWords.join(" ");
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
<style lang="less" scoped>
.content {
  height: 100%;
  width: 100%;
  background: #ff9e3a;
  .header {
    // position: fixed;
    height: 18%;
    // z-index: 100;
    width: 100%;
    background-image: url(../assets/search.png);
    background-size: 100%;
    .background-img {
      width: 100%;
      z-index: -1;
      img {
        width: 100%;
      }
    }
    .header-item {
      height: 100%;
      padding-top: 5%;
      .logo-svg {
        height: 50%;
        width: 100%;
        img {
          width: 30%;
          margin: auto;
        }
      }
      .control-search {
        margin-top: 5%;
        // height: 30%;
        margin: 0 0 20px 0;
        position: relative;
        // height: 50%;
        .customSelect {
          width: 90%;
        }
        .search-btn {
          position: absolute;
          border: #fff;
          height: 100%;
          box-shadow: none;
          transform: translateX(-100%);
        }
      }
    }
  }
  .main-content {
    // position: fixed;
    // z-index: 999;
    height: 88%;
    width: 100%;
    background-color: #fff;
    bottom: 0;
  }
}
</style>>
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
}

.main-content {
  background: rgb(255, 255, 255);
  border-radius: 30px 30px 0 0;
  height: 80%;
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

.close {
  transform: translateY(100%);
}
</style>
<style lang="less">
.customTransSelect {
  :global {
    .ant-select-selection {
      border-radius: 30px;
      background-color: #fff45;
    }
  }
}
.custonTab {
  // height: 100%;
}
</style>