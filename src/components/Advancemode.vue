<template>
  <div class="modetwo">
    <div class="demo-infinite-container">
      <a-list :dataSource="searchContent">
        <a-list-item slot="renderItem" slot-scope="item, index" style="border: white;">
          <div class="list-item">
            <!-- <a-list-item-meta :description="item.description"></a-list-item-meta> -->
            <div class="list-item-desc">{{item.description}}</div>
            <div class="add-function-button">
              <a-button
                v-if="item.visible"
                type="primary"
                shape="circle"
                icon="plus"
                @click="addCart(index)"
                :size="size"
              />
              <a-button
                v-else
                type="primary"
                shape="circle"
                icon="minus"
                @click="removeCart(index)"
                :size="size"
              />
            </div>
          </div>
        </a-list-item>
      </a-list>
    </div>

    <!-- 购物车 -->
    <a-drawer
      title="素材句子"
      :height="500"
      class="shoping-car"
      placement="bottom"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <div class="drawer-container">
        <a-list :dataSource="shopingCart">
          <a-list-item slot="renderItem" slot-scope="item" style="border: white; padding 0 0 0">
            <div class="list-item" style="width: 100%;">
              {{ item.description }}
              <!-- <a-list-item-meta :description="item.description"></a-list-item-meta> -->
              <div style="float: right">
                <a-button
                  type="primary"
                  shape="circle"
                  icon="minus"
                  class="add-function-button"
                  @click="removeCart(item.index)"
                  :size="size"
                />
              </div>
            </div>
          </a-list-item>
        </a-list>
      </div>

      <div
        :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }"
      >
        <a-button :style="{marginRight: '8px'}" @click="handleRoute">
          <a-icon type="edit" />
          编辑 ({{ totalSelectItem }})
        </a-button>
        <a-button @click="openNotification" type="primary">清空</a-button>
      </div>
    </a-drawer>
    <div class="shop-footer">
      <!-- <a-button-group style="width: 100%"> -->
      <a-row style="padding: 0 10px 0 10px;">
        <a-col :span="8">
          <a-button
            class="selected-btn"
            size="large"
            type="primary"
            @click="showDrawer"
          >选择（{{ totalSelectItem}}）</a-button>
        </a-col>
        <a-col :span="16">
          <a-button class="comfer-btn" size="large" type="primary" @click="handleRoute">
            <a-icon type="edit" />
            编辑
          </a-button>
        </a-col>
      </a-row>
      <!-- </a-button-group> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { tmpdir } from "os";
const API = "http://deecamp.tangkailh.cn:10081/";
const test_data = [
  {
    description: "test 1",
    visible: "true"
  },
  {
    description: "test 2",
    visible: "true"
  },
  {
    description: "test 3",
    visible: "true"
  },
  {
    description: "test 4",
    visible: "true"
  },
  {
    description: "test 5",
    visible: "true"
  }
];

export default {
  name: "Advancemode",
  data() {
    return {
      description: "",
      searchContent: [],
      size: "small",
      shopingCart: [],
      spinning: false,
      visible: false,
      editVisible: false
      // test_data_list: test_data
    };
  },

  methods: {
    handleRoute() {
      this.description = this.shopingCart.map(d => d.description).join("\n");
      this.$router.push({ path: "/share", query: { text: this.description } });
    },
    addCart(idx) {
      this.shopingCart.push({
        index: idx,
        description: this.searchContent[idx].description
      });
      this.searchContent[idx].visible = false;
    },
    removeCart(idx) {
      var item;
      var remove_id = 0;
      for (item of this.shopingCart) {
        if (item.index == idx) {
          break;
        } else {
          remove_id++;
        }
      }
      this.shopingCart.splice(remove_id, 1);
      this.searchContent[idx].visible = true;
    },
    clearCart() {
      for (var item of this.searchContent) {
        item.visible = true;
      }
      this.shopingCart = [];
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
        this.searchContent = [];
        this.searchContent = response.data
          .filter(d => d.length < 25)
          .map(d => {
            return {
              description: d,
              visible: true
            };
          });
        me.spinning = !me.spinning;
      });
    },
    go() {
      this.$router.push("/hello");
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
    openNotification() {
      const key = `open${Date.now()}`;
      this.$notification.config({
        duration: 0
      });
      this.$notification.open({
        message: "注意",
        description: "是否确认清空购物车？",
        btn: h => {
          return h(
            "a-button",
            {
              props: {
                type: "primary",
                size: "small"
              },
              on: {
                click: () => {
                  this.clearCart();
                  this.$notification.close(key);
                  this.onClose();
                }
              }
            },
            "确认"
          );
        },
        key
      });
    },
    onChange(e) {
      this.placement = e.target.value;
    }
  },

  computed: {
    totalSelectItem: function() {
      return this.shopingCart.filter(i => !i.visible).length;
    }
  }
};
</script>
<style lang="less">
.ant-drawer-content-wrapper {
  border-radius: 20px 20px 0 0;
  .ant-drawer-content {
    border-radius: 20px 20px 0 0;
    .ant-drawer-header {
      border-radius: 20px 20px 0 0;
      text-align: center;
    }
    .ant-drawer-body {
      height: 350px;
      padding: 0;
      .drawer-container {
      }
    }
  }
}
</style>
<style lang="less" scoped>
.drawer-container {
  border-radius: 4px;
  overflow: auto;
  // padding: 8px 24px;

  height: 400px;
  padding: 10px 7% 0 7%;
  .list-item {
    border: #ff5b40 solid 1px;
    border-radius: 10px;
    text-align: left;
    // width: 90%;
    padding: 4% 0 4% 5%;
    // box-shadow: 2px 2px 3px #ff5b4040;
    .list-item-desc {
      float: left;
    }
    .add-function-button {
      float: right;
      transform: translateX(50%);
      // margin-top: 9%;
    }
  }
}
.demo-infinite-container {
  border: 1px solid #fff;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 550px;
  .list-item {
    border: #ff5b40 solid 1.5px;
    border-radius: 10px;
    text-align: left;
    width: 100%;
    padding: 5% 0 5% 5%;
    box-shadow: 2px 2px 3px #ff5b4040;
    .list-item-desc {
      float: left;
    }
    .add-function-button {
      float: right;
      transform: translateX(50%);
      // margin-top: 9%;
    }
  }
}

.shop-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  button {
    width: 98%;
  }
  .selected-btn {
    border-radius: 10px 0 0 10px;
  }
  .comfer-btn {
    margin-left: 5px;
    border-radius: 0 10px 10px 0;
  }
}
</style>
<style scoped>
.list-item {
  text-align: left;
  width: 75%;
}
.demo-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}
</style>
