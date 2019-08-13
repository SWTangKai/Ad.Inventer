<template>
  <div class="modeone">
    <div class="control-res">
      <a-spin style="height: 100%" :spinning="spinning" :delay="delayTime">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide v-for="(item) in gencontent" v-bind:key="item">
            <a-card
              :loading="loading"
              :bordered="false"
              class="res-card"
              bodyStyle="height:100%; padding:0; width: 100%"
            >
              <div class="card-text-content">
                <p>{{ item }}</p>
              </div>
              <div class="card-rate">
                <a-rate style="float: right" :defaultValue="0" />
              </div>
              <div class="rate-icon">
              <RateIconSVG class="svg-rate-icon" />
              </div>
            </a-card>
          </swiper-slide>
        </swiper>
      </a-spin>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import RateIconSVG from "../assets/svg/2功能一评分章icon-15.svg";

const API = "http://deecamp.tangkailh.cn:10081/";

import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "Basemode",
  components: { swiper, swiperSlide, RateIconSVG },
  data() {
    return {
      gencontent: {
        ES_result: "D",
        ES_result_1: "D",
        KOBE_result: "S"
      },
      loading: true,
      aspect: "a",
      spinning: false,
      delayTime: 50,
      swiperOption: {
        direction: "horizontal",
        spaceBetween: 0.1,
        slidesPerView: 1.35, //同时显示的slide数量
        observeParents: true, //观察父组件，当父组件变化时，自己随着变化
        observer: true, //观察自己，自己的参数变化时，更新
        centeredSlides: true, //设置为true时，活动块居中显示，默认下居左显示
        loop: false, //滑动过程中会在前后复制多个slider,效果看起来是循环的
        loopedSlides: 100, //设置滑动过程中所要用到的loop个数
        loopAdditionalSlides: 100
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
    Rename: function(value) {
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
    this.swiper.slideTo(1, 1000, false);
  }
};
</script>


<style lang="less" scoped>
.control-res {
  margin: 0 0 20px 0;
  overflow: hidden;
  height: 50%;
  .swiper-slide-next{
    margin-top:10%;
  }
  .swiper-slide-prev{
    margin-top:10%;
  }
  .res-card {
    border: #ff5b40 solid 2px;
    border-radius: 15px;
    width: 90%;
    height: 400px;
    margin: 5% 0 0 0;
    display: inline-block;
    .card-rate {
      border-top: 3px;
      border-top-color: #ff5b40;
      border-top-style: solid;
      border-top-width: 2px;
      padding-right: 10%;
      height: 10%;
    }
    .card-text-content {
      height: 90%;
      padding: 10%;
    }
    p {
      line-height: 180%;
      font-size: 110%;
    }
    .rate-icon{
      transform: translateY(-110%);
      width: 20%;
      margin: 0 10%;
      svg{
        // fill: #ff5b40;
      }
    }
  }
}

</style>