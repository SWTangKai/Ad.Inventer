<template>
  <div class="modeone">
    <div class="control-res">
      <a-spin style="height: 100%" :spinning="spinning" :delay="delayTime">
       
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item, index) in gencontent" v-bind:key="item" >
            <a-card
              hoverable
              :loading="loading"
              :bordered="false"
              class="res-card"
              bodyStyle="height:100%;"
            >
              <div style="height:90%">
                <p style="line-height:180%;font-size:130%">{{ item }}</p>
              </div>
              <div style="boder-top:1px">
                <a-rate :defaultValue="0" />
              </div>
            </a-card>
          </swiper-slide>
        </swiper>

      <div  style="">
        <a-button class="edit-btn">编辑</a-button>
      </div>
      </a-spin>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const API = "http://deecamp.tangkailh.cn:10081/";

import carousel from "vue-owl-carousel";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "Basemode",
  components: { carousel, swiper, swiperSlide },
  data() {
    return {
      gencontent: {
        ES_result: "DS",
        KOBE_result: "SS"
      },
      loading: true,
      aspect: "a",
      spinning: false,
      delayTime: 50,
      swiperOption: {
        direction: "horizontal",
        spaceBetween: 0.1,
        slidesPerView:1.35, //同时显示的slide数量
        observeParents: true, //观察父组件，当父组件变化时，自己随着变化
        observer: true, //观察自己，自己的参数变化时，更新
        centeredSlides: true, //设置为true时，活动块居中显示，默认下居左显示
        loop: false, //滑动过程中会在前后复制多个slider,效果看起来是循环的
        loopedSlides: 100, //设置滑动过程中所要用到的loop个数
        loopAdditionalSlides: 100,
      }
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
        ES_result: "基于检索的方法",
        KOBE_result: "基于生成的方法"
      };
      return maps[value];
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  mounted() {
    console.log("this is current swiper instance object", this.swiper);
    this.swiper.slideTo(3, 1000, false);
  }
};
</script>

<style scoped>
.swiper-slide-prev,.swiper-slide-next{
  margin-top:8%;
}

.control-res {
  margin: 0 0 20px 0;
  overflow: hidden;
  height: 50%;
}
.edit-btn {
  width: 80%;
  margin: 5%;
  border-radius: 10px;
}
.res-card {
  background: rgb(0, 0, 0);
  border-radius: 5%;
  width: 80%;
  height: 400px;
  margin: 5% 0 0 0;
  display: inline-block;
}

</style>
