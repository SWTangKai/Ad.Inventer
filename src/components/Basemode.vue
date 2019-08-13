<template>
  <div class="modeone">
    <div class="control-res">
      <a-spin style="height: 100%" :spinning="spinning" :delay="delayTime">
        <a-row type="flex" justify="space-around" align="top">
          <a-col :span="4">
            <a-card
              :loading="loading"
              :bordered="false"
              class="res-card"
              v-for="(item, index) in gencontent"
              v-bind:key="item"
            >
              <p>{{ item }}</p>
              <a-rate :defaultValue="0" />
            </a-card>
          </a-col>
        </a-row>
      </a-spin>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const API = "http://deecamp.tangkailh.cn:10081/";

import carousel from "vue-owl-carousel";

export default {
  name: "Basemode",
  components: { carousel },
  data() {
    return {
      gencontent: {
        ES_result: "DS",
        KOBE_result: "SS",
        KOBE_result1: "SS",
        KOBE_result2: "SS"
        // KOBE_result3: "SS",
        // KOBE_result4: "SS",
        // KOBE_result5: "SS",
        // KOBE_result6: "SS"
      },
      loading: true,
      aspect: "a",
      spinning: false,
      delayTime: 50
    };
  },
  methods: {
    reqGenDoc(params) {
      console.log(params);
      let me = this;
      me.spinning = !me.spinning;
      this.$http.get(API + "deecamp?" + params).then(response => {
        console.log(response.data);
        this.gencontent = response.data;
        me.loading = false;
        me.spinning = !me.spinning;
      });
    }
  },
  filters: {
    capitalize: function(value) {
      // console.log("TEST: ", value);
      let maps = {
        // ES_result: "基于生成的方法",
        // KOBE_result: "基于检索的方法1",
        // KOBE_result1: "基于的方法2",
        // KOBE_result2: "基于生成的方法3",
        // KOBE_result3: "基于生成的方法4",
        // KOBE_result4: "基于生成的方法5",
        // KOBE_result5: "基于生成的方法6",
        // KOBE_result6: "基于生成的方法7"
      };
      return maps[value];
    }
  }
};
</script>

<style scoped>
.control-res {
  margin: 0 0 20px 0;
  overflow: hidden;
  height: 50%;
}
.res-card {
  width: 100%;
}
</style>
