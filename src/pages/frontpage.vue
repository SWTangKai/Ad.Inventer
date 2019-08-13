<template>
  <div class="content">
    <div class="header" style="height: 80%; padding-top: 60%">
      <div class="header-item" style="height: 20%; margin:auto">
        <div class="logo-svg" style="height: 50%;  ">
          <Logo
            style="fill:#FF5B40; display: block; height: 100%; margin:auto"
            preserveAspectRatio="xMinYMin meet"
          />
        </div>
      </div>
      <div class="control-search">
        <a-select
          :allowClear="true"
          :maxTagCount="3"
          size="large"
          mode="tags"
          style="width: 90%; padding-left: 5px"
          class="customSelect"
          @change="handleChange"
          placeholder="请输入关键词"
        >
          <a-select-option v-for="i in keywords" :key="i">{{i}}</a-select-option>
        </a-select>
        <a-button
          ghost
          style="position: absolute; border: #fff; height: 100%;box-shadow: none;"
          @click="handleGen"
          slot="suffix"
          class="search-btn"
          type="primary"
        >
          <a-icon type="arrow-right" style="color: #FF5B40" />
        </a-button>
      </div>
    </div>
    <MainSVG style="bottom: 0; left: 0; position: fixed" />
  </div>
</template>

<script>
/* eslint-disable */
import MainSVG from "../assets/svg/ui界面成稿-12.svg";
import Logo from "../assets/svg/logo.svg";

export default {
  name: "Front",
  props: {
    msg: String
  },
  components: { Logo, MainSVG },
  data() {
    return {
      queryWords: "",
      keywords: [],
      aspect: "a"
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
        "keywords=" + this.queryWords.join(" ") + "&aspects=" + this.aspect;
      window.test = this.$refss;
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
  width: 100%;
  background: #fff7f2;
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

.close {
  transform: translateY(100%);
}
</style>
<style lang="less">
.customSelect {
  :global {
    .ant-select-selection {
      border-radius: 20px;
      border: 1px #ff5b40 solid;
      font-size: 1px;
      li {
        border-radius: 20px;
      }
    }
    // .ant-select-selection__rendered {
    //     padding-left: 10px;
    // }
    .ant-select-selection__placeholder {
        padding-left: 10px;
        font-size:20px;
    }
  }
}

</style>