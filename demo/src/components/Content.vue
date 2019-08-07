<template>
  <div class="content">
    <div>
      <div class="aspect" style="margin-botton: 5px;">
        <a-radio-group v-model="aspect" size="large">
          <a-radio-button value="a">外观</a-radio-button>
          <a-radio-button value="b">材质</a-radio-button>
          <a-radio-button value="c">功能</a-radio-button>
        </a-radio-group>
      </div>
    </div>
    <div>
      <a-select 
        mode="tags"
        style="width: 80%; padding-top: 10px; padding-botton: 5px"
        @change="handleChange"
        placeholder="请输入关键词"
      >
        <a-select-option v-for="i in keywords" :key="i">{{i}}</a-select-option>
      </a-select>
    </div>

    <div style="padding:10px; ">
      <a-spin :spinning="spinning" :delay="delayTime">
        <a-card :title="index | capitalize" :loading="loading" :bordered="false" class="res-card" v-for="item, index in gencontent">{{ item }}</a-card>
      </a-spin>
    </div>
    <div>
      <a-button @click="handleGen">文本生成</a-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

const API = "http://deecamp.tangkailh.cn:10080/";

const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];

export default {
  name: "Content",
  props: {
    msg: String
  },
  data() {
    return {
      gencontent: {
        "ES_result": "DS",
        "KOBE_result": "SS"
      },
      queryWords: "",
      keywords: [],
      loading: true,
      aspect: "a",
      spinning: false,
      delayTime: 50,
      data
    };
  },
  mounted() {
    this.LoadKeyword();
  },
  methods: {
    LoadKeyword() {
      this.$http.get(API + "deecamp_keywords").then(res => {
        console.log(res.data);
        this.keywords = res.data.slice(0, 100);
      });
    },
    handleChange(value) {
      // console.log(`selected ${value}`);
      this.queryWords = value;
    },
    handleGen() {
      let me = this;
      //   window.vass =
      me.spinning = !me.spinning;
      this.$http
        .get(
          API +
            "deecamp?keywords=" +
            this.queryWords.join(" ") +
            "&aspects=" +
            this.aspect
        )
        .then(response => {
          console.log(response.data);
          this.gencontent = response.data;
          me.loading = false;
          me.spinning = !me.spinning;
        });
    }
  },
  filters: {
    capitalize: function (value) {
      console.log("TEST: ", value)
      let maps = {
        "ES_result": "基于检索的方法",
        "KOBE_result": "基于生成的方法"
      }
      return maps[value]
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* div {
  margin: 10px;
} */

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
  width: 300px;
  margin: auto;
}
</style>
