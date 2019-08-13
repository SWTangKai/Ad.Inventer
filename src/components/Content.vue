<template>
  <div class="content">
    <div class="header">
      <div class="header-item">
        <div class="logo-placehorlder"></div>
        <div class="logo-svg">
          <Logo class="logo" preserveAspectRatio="xMinYMin meet" />
        </div>
      </div>
      <div class="control-search">
        <a-select
          :maxTagCount="3"
          size="large"
          mode="tags"
          class="customSelect"
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
    <div class="main-content">
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="功能一" key="1">
          <modeone ref="modeone" />
        </a-tab-pane>
        <a-tab-pane tab="功能二" key="2" forceRender>
          <modetwo ref="modetwo" />
        </a-tab-pane>
      </a-tabs>
    </div>=
  </div>
</template>

<script>
/* eslint-disable */
import Basemode from "./Basemode.vue";
import Advancemode from "./Advancemode.vue";
import MainSVG from "../assets/svg/ui界面成稿-12.svg";
import Logo from "../assets/svg/logo.svg";
const API = "http://deecamp.tangkailh.cn:10081/";

export default {
  name: "Content",
  props: {
    msg: String
  },
  components: { modeone: Basemode, Logo, MainSVG, modetwo: Advancemode },
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
<style lang="less" scoped>
.content {
  
  height: 100%;
  width: 100%;
  background: #fff7f2;
  .header {
    // position: fixed;
    height: 20%;
    // z-index: 100;
    width: 100%;
    .header-item {
      height: 70%;
      .logo-placehorlder {
        height: 30%;
      }
      .logo-svg {
        height: 50%;
        width: 100%;
        .logo {
          fill: #ff5b40;
          display: block;
          height: 100%;
          margin: auto;
        }
      }
    }
    .control-search {
      // height: 30%;
      margin: 0px 0 20px 0;
      position: relative;
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
  .main-content{
    // position: fixed;
    // z-index: 999;
    margin:7% 0 0 0;
    width: 100%;
    bottom: 0;
  }
  .logo-svg {
    // z-index: -1;
    // position: fixed;
    // display: block;
    // text-indent: -9999px;
    // width: 100px;
    // height: 100px;
    // background: url(gblogo.svg);
    background-size: 100px 82px;
    .svg-draw {
      top: 0;
      left: 0;
      position: fixed;
      display: block;
    }
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
.customSelect {
  
  :global {
    .ant-select-selection {
      border-radius: 30px;
      li{
        font-size:18px;
      }
    }
  }
}
</style>