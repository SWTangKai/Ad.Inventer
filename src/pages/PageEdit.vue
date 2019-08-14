<template>
  <div>
    <div ref="capture">
      <br /><br />
      <a-textarea v-model="description" style="width: 90% " :rows="14" />
      <br /><br />
      <a-button size="large" @click="handleBack">首页</a-button>
      <a-button size="large" @click="doCopy">复制</a-button>
      <a-button size="large">分享</a-button>
    </div>
    <div class="share-img" id="shareImg" ref="capImg"></div>

    <a-drawer
      title="素材句子"
      :height="300"
      placement="bottom"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <div class="drawer-container">
        <a-button size="large" >微信</a-button>
        <br />
        <a-button size="large" >朋友圈</a-button>
        <br />
        <!-- <a-button size="large" icon="download" @click="clickGeneratePicture">下载图片</a-button> -->
        <a-button size="large" icon="download">下载图片</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import html2canvas from "html2canvas" 
export default {
  name: "PageEdit",
  components: {},
  data() {
    return {
      description: "",
      visible: false,
      modalVisible: false,
      modalLoading: false
    };
  },
  mounted() {
    this.loadDescription();
  },
  methods: {
    generatePicture() {
      const opts = {
        backgroundColor: null,
        scale: 1
      }
      html2canvas(this.$refs.capture, opts).then(canvas => {
        document.getElementById('shareImg').appendChild(canvas)
      });
    },
    doCopy() {
      this.$message.success("Copyed!", 1);
      this.$copyText(this.description);
    },
    handleBack() {
      this.$router.push('/')
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    loadDescription() {
      this.description = this.$route.query.text
    }
  }
};
</script>

<style scoped>
div {
  font: 2em sans-serif;
  color: brown;
}
/* .share-img {
  width: 782px;
  height: 722px;
  position: fixed;
  top: 0px;
  left: 0px;
  opacity: 1;
  transform: scale(0.8);
  z-index: 99999999;
} */
</style>
