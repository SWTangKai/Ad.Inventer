<template>
  <div class="modeone">
    <div class="control-res">
      <a-spin style="height: 100%" :spinning="spinning" :delay="delayTime">
        <!-- <carousel :autoWidth="true" :margin="10" :nav="false" :center="true" :lazyLoad="true"> -->
          <a-card
            :title="index | capitalize"
            :loading="loading"
            :bordered="false"
            class="res-card"
            v-for="(item, index) in gencontent"
            v-bind:key="item"
          ><p>{{ item }}</p>
          <a-rate :defaultValue="0" />
          </a-card>
        <!-- </carousel> -->
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
  components: { carousel},
  data() {
    return {
      gencontent: {
        ES_result: "DS",
        // KOBE_result: "SS"
      },
      loading: true,
      aspect: "a",
      spinning: false,
      delayTime: 50,
    };
  },
  methods: {
    reqGenDoc(params) {
      console.log(params)
      let me = this;
      me.spinning = !me.spinning;
      this.$http
        .get(
          API +
            "deecamp?" + params  
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
    capitalize: function(value) {
      // console.log("TEST: ", value);
      let maps = {
        ES_result: "基于检索的方法",
        KOBE_result: "基于生成的方法"
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
</style>
