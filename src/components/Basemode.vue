<template>
  <div class="modeone">
    <div class="control-res">
      <div class="control-things">
        <div class="aspect">
          <a-radio-group defaultValue="a" v-model="aspect" @change="reqGenDoc" buttonStyle="outline">
            <a-radio-button value="a">外观</a-radio-button>
            <a-radio-button value="b">材质</a-radio-button>
            <a-radio-button value="c">功能</a-radio-button>
          </a-radio-group>
          <a-radio-group
            defaultValue="c"
            v-model="lenghtOfText"
            @change="reqGenDoc"
            buttonStyle="outline"
          >
            <a-radio-button value="a">短</a-radio-button>
            <a-radio-button value="b">中</a-radio-button>
            <a-radio-button value="c">长</a-radio-button>
          </a-radio-group>
        </div>
      </div>
      <a-spin style="height: 100%" :spinning="spinning" :delay="delayTime">
        <a-card
          :loading="loading"
          :bordered="false"
          class="res-card"
          bodyStyle="height:100%; padding:20px 0px 0 0px; width: 100%"
        >
          <div class="card-text-content">
            <p style="text-align: left">{{now_text}}</p>
          </div>
          <div class="card-rate" @click="handleRateClick">
            <a-rate style="margin: 4% 13% 0 41%; font-size: 25px" :defaultValue="0" />
          </div>
          <div class="rate-icon">
            <img src="../assets/rate-btn.png" alt />
          </div>
        </a-card>
      </a-spin>
      <a-button @click="handleReload" size="large" class="mode1-edit-btn" type="primary">
        <a-icon :component="EditSVG" />不满意？点击生成更多
      </a-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

import RateIconSVG from "../assets/svg/rate-icon.svg";
import EditSVG from "../assets/svg/2功能一编辑icon-17.svg";

const API = "http://deecamp.tangkailh.cn:10081/";

export default {
  name: "Basemode",
  components: { swiper, swiperSlide, RateIconSVG, EditSVG },
  data() {
    return {
      gencontent: {
        ES_result: "D",
        ES_result_1: "D",
        KOBE_result: "S"
      },
      loading: true,
      aspect: "a",
      lenghtOfText: "c",
      spinning: false,
      delayTime: 50,
      params: "",
      now_text: "",
      now_text_idx: 0,
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
      if (typeof(params) !== "object") {
        this.params = params;
      }

      let me = this;
      me.spinning = true;
      this.$http
        .get(
          API +
            "deecamp?" +
            this.params +
            "&aspects=" +
            this.aspect +
            "&length=" +
            this.lenghtOfText
        )
        .then(response => {
          console.log(response.data);
          this.gencontent = response.data;
          this.now_text_idx = 0;
          this.now_text = this.gencontent[0];
          me.loading = false;
          me.spinning = false;
        });
    },
    handleRateClick() {
      this.$message.success("感谢您的评分，这会让我们模型变得更好!", 1);
    },
    handleReload() {
      this.now_text_idx = (this.now_text_idx + 1) % this.gencontent.length;
      this.now_text = this.gencontent[this.now_text_idx];
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
    this.swiper.slideTo(3, 1000, false);
  }
};
</script>
<style lang="less">
.control-res {
  margin: 0 0 10px 0;
  overflow: hidden;
  height: 60%;
  .res-card {
    border: #ff5b40 solid 1.5px;
    border-radius: 5%;
    width: 90%;
    height: 400px;
    margin: 5% 0 0 0;
    display: inline-block;
    .card-text-content {
      height: 80%;
      padding: 5%;
      p {
        line-height: 180%;
        font-size: 110%;
      }
    }
    .card-rate {
      border-top: 3px;
      border-top-color: #ff5b40;
      border-top-style: solid;
      border-top-width: 1.5px;
      padding-right: 0;
      width: 100%;
  
      height: 10%;
    }

    .rate-icon {
      transform: translateY(-120%);
      width: 20%;
      margin: 4% 0 0 10%;
      img {
        width: 100%;
      }
    }
  }
  .mode1-edit-btn {
    margin-top: 2%;
    border-radius: 15px;
    width: 90%;
    height: 55px;
  }
}
</style>