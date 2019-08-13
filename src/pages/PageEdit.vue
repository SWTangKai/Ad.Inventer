<template>
  <div class="edit-area">
    <div class="edit-header">
      <img src="../assets/logo-word.png" alt="">
    </div>
    <div class="edit-content" ref="capture">
      <div class="edit-card">
        <a-textarea class="edit-editarea" v-model="description" :rows="14" />
        <div class="edit-btns">
          <div class="edit-btns-group">
            <a-button size="large" @click="handleBack">首页</a-button>
            <a-button size="large" @click="doCopy">复制</a-button>
            <a-button size="large" @click="generatePicture">分享</a-button>
          </div>
        </div>
      </div>
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
        <a-button size="large">微信</a-button>
        <br />
        <a-button size="large">朋友圈</a-button>
        <br />
        <!-- <a-button size="large" icon="download" @click="clickGeneratePicture">下载图片</a-button> -->
        <a-button size="large" icon="download">下载图片</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
/* eslint-disable */
import html2canvas from "html2canvas";
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
        width: "112px",
        height: "132px",
        backgroundColor: null,
        scale: 1
      };
      html2canvas(this.$refs.capture, opts).then(canvas => {
        document.getElementById("shareImg").appendChild(canvas);
      });
    },
    doCopy() {
      this.$message.success("Copyed!", 1);
      this.$copyText(this.description);
    },
    handleBack() {
      this.$router.push("/");
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    loadDescription() {
      this.description = this.$route.query.text;
    }
  }
};
</script>
<style lang="less" scoped>
.edit-area {
  height: 100%;
  .edit-header {
    height: 20%;
    width: 100%;
    margin: auto; 
    img{
      margin: 20%;
      width: 30%;
    }
  }
  .edit-content {
    margin: auto;
    .edit-card {
      border: #ff5b40 solid 2px;
      width: 90%;
      margin: auto;
      border-radius: 10px;
      padding: 10% 0 0 0;
      .edit-editarea {
        width: 85%;
        margin-bottom: 5%;
      }
      .edit-btns {
        width: 100%;
        height: 20%;
        border-top: #ff5b40 solid 2px;
        margin-top: 10px;
        .edit-btns-group{
          margin: auto;
          width: 90%;
        }
        button {
          width: 30%;
          margin: 20px 5px;
          border-radius: 10px;
          border: #ff5b40 solid 2px;
        }
      }
    }
  }
}
</style>

