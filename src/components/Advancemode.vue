<template>
  <div class="modetwo">
    <!-- 搜索显示列表 -->
    <div
      class="demo-infinite-container"
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="15"
      style="border:lightblue"
    >
      <a-list :dataSource="searchContent">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="list-item">
            <a-list-item-meta :description="item">
              <a slot="title">{{item.title}}</a>
            </a-list-item-meta>
          </div>
          <div class="add-function-button">
            <a-button shape="circle" icon="plus" @click="addCart(index)" :size="size" />
            <a-button shape="circle" icon="plus" />
          </div>
        </a-list-item>
        <!-- <div v-if="loading && !busy" class="demo-loading-container">
            <a-spin />
        </div>-->
      </a-list>
    </div>

    <a-button
      @click="showDrawer"
      style="width:40%;margin:2%;border-top-left-radius:10px;
      border-bottom-left-radius:10px"
    >选择</a-button>
    <a-button
      style="width:50%;margin:2%;border-top-right-radius:10px;
      border-bottom-right-radius:10px "
    >编辑</a-button>

    <a-drawer
      title="Basic Drawer"
      placement="bottom"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <div
        class="demo-infinite-container"
        v-infinite-scroll="handleInfiniteOnLoad"
        :infinite-scroll-disabled="busy"
        :infinite-scroll-distance="15"
      >
        <a-list :dataSource="shopingCart">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <div class="list-item">
              <a-list-item-meta :description="item"></a-list-item-meta>
            </div>
            <!-- <div class="add-function-button">
                <a-button type="primary" shape="circle" icon="copy" @click="doCopy(index)" :size="size" />
                <a-button style="float: right;" type="primary" shape="circle" icon="plus" @click="addCart(index)" :size="size" />
            </div>-->
          </a-list-item>
        </a-list>
      </div>
    </a-drawer>
  </div>
</template>

<script>
/* eslint-disable */
const API = "http://deecamp.tangkailh.cn:10081/";

export default {
  name: "Advancemode",
  data() {
    return {
      searchContent: [],
      size: "small",
      shopingCart: [],
      spinning: false,
      visible: false
    };
  },
  methods: {
    addCart(index) {
      this.shopingCart.push(this.searchContent[index]);
    },
    doCopy(index) {
      this.$message.success("Copyed!", 1);
      this.$copyText(this.searchContent[index]).then(
        function(e) {
          // alert('Copied')
          console.log(e);
        },
        function(e) {
          alert("Can not copy");
          console.log(e);
        }
      );
    },

    reqGenSen(param) {
      console.log(param);
      let me = this;
      me.spinning = !me.spinning;
      this.$http.get(API + "deecamp_muti?" + param).then(response => {
        console.log(response.data);
        this.searchContent = response.data;
        me.spinning = !me.spinning;
      });
    },
    handleInfiniteOnLoad() {
      const data = this.data;
      this.loading = true;
      if (data.length > 14) {
        this.$message.warning("Infinite List loaded all");
        this.busy = true;
        this.loading = false;
        return;
      }
      this.fetchData(res => {
        this.data = data.concat(res.results);
        this.loading = false;
      });
    },
    info() {
      this.$message.info("This is a normal message");
    },

    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    onChange(e) {
      this.placement = e.target.value;
    }
  }
};
</script>

<style scoped>
.list-item {
  text-align: left;
  width: 75%;
}
.demo-infinite-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 500px;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
