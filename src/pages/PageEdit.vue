<template>
  <div>
    <br /><br />
    <a-textarea v-model="description" style="width: 90% " :rows="14" />
    <br /><br />
    <a-button size="large" @click="handleBack">首页</a-button>
    <a-button size="large" @click="doCopy">复制</a-button>
    <a-button size="large" @click="showDrawer">分享</a-button>

    <!-- 购物车 -->
    <a-drawer
      title="素材句子"
      :height="300"
      placement="bottom"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <div class="drawer-container">
        <a-button size="large" @click="handleBack">微信</a-button>
        <br />
        <a-button size="large" @click="doCopy">朋友圈</a-button>
        <br />
        <a-button size="large" icon="download" @click="showDrawer">下载图片</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "PageEdit",
  components: {},
  data() {
    return {
      description: "",
      visible: false
    };
  },
  mounted() {
    this.loadDescription();
  },
  methods: {
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
</style>
