<template>
  <div class="edit-area">
    <div class="edit-header">
      <!-- <img src="../assets/logo-word.png" alt=""> -->
    </div>
    <div class="edit-content">
      <div class="edit-card">
        <a-textarea class="edit-editarea" v-model="description" :rows="14" />
        <div class="edit-btns">
          <div class="edit-btns-group">
            <a-button size="large" @click="handleBack">
              <a-icon type="home" />  
              首页
            </a-button>
            <a-button size="large" style="color: #ffffff; background: #ff5b40" @click="doCopy">
              <a-icon type="copy" />
              复制
            </a-button>
            <a-button size="large" @click="genPicture">
              <a-icon type="share-alt" />
              分享
            </a-button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div>
      <div ref="capture">
        <a-card
          hoverable
          style="width: 300px"
        >
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
          />
          <a-card-meta
            title="Card title"
            description="This is the description">
            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </a-card-meta>
        </a-card>
      </div> -->
      <!-- <a-button type="primary" @click="showModal">Open Modal with async logic</a-button> -->
      <a-modal
        title=""
        :footer="null"
        :visible="visible"
        @cancel="handleCancel"
      >
        <!-- <div ref="shareImg">
        </div> -->
        <img :src="imgUri" />
        <!-- <p>{{ModalText}}</p> -->
      </a-modal>
      <img :src="imgUri" />
      <!-- <div ref="shareImg"></div> -->
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
    };
  },
  mounted() {
    this.loadDescription();
  },
  methods: {
    genPicture() {
      const opts = {
        backgroundColor: null,
        scale: 1
      };
      html2canvas(this.$refs.capture, opts).then(canvas => {
        // this.$refs.shareImg.appendChild(canvas);
        this.imgUri = canvas.toDataURL("image/png")
      });
    },
    doCopy() {
      this.$message.success("Copyed!", 1);
      this.$copyText(this.description);
    },
    handleBack() {
      this.$router.push("/");
    },
    loadDescription() {
      this.description = this.$route.query.text;
    },
    showModal() {
      this.visible = true
    },
    // handleOk(e) {
    //   this.ModalText = 'The modal will be closed after two seconds';
    //   this.confirmLoading = true;
    //   setTimeout(() => {
    //     this.visible = false;
    //     this.confirmLoading = false;
    //   }, 2000);
    // },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false
    },
  }
};
</script>
<style lang="less" scoped>
.edit-area {
  background-image: url(../assets/editpage.png);
  background-size: 100%;
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
      border: #ff5b40 solid 1.5px;
      width: 90%;
      margin: auto;
      border-radius: 10px;
      padding: 0 0 0 0;
      background: #ffffff;
      .edit-editarea {
        border: transparent;
        width: 85%;
        margin: 5px 5px 5px 5px;
        // background: transparent;
      }
      .edit-btns {
        width: 100%;
        height: 20%;
        border-top: #ff5b40 solid 1.5px;
        margin-top: 10px;
        .edit-btns-group{
          margin: auto;
          width: 90%;
        }
        button {
          width: 30%;
          margin: 20px 5px;
          border-radius: 10px;
          border: #ff5b40 solid 1.5px;
          color:#ff5b40;
        }
      }
    }
  }
}
</style>

