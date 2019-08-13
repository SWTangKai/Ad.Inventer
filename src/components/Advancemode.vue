<template>
  <div class="modetwo">
    <div class="demo-infinite-container">
      <a-list :dataSource="searchContent">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="list-item" style="width: 100%">
            <a-list-item-meta :description="item.description"></a-list-item-meta>
            <div class="add-function-button" style="float: right">
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
      placement="bottom"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <div class="drawer-container">
        <a-list :dataSource="shopingCart">
          <a-list-item slot="renderItem" slot-scope="item">
            <div class="list-item" style="width: 100%">
              {{ item.description }}      
              <!-- <a-list-item-meta :description="item.description"></a-list-item-meta> -->
              <div style="float: right">
                <a-button
                  type="primary"
                  shape="circle"
                  icon="minus"
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
        <a-button
          :style="{marginRight: '8px'}"
          @click="startEdit();handleRoute()"
        >编辑 ({{ totalSelectItem }})</a-button>
        <a-button @click="openNotification" type="primary">清空</a-button>
      </div>
    </a-drawer>
    <div class="shop-footer">
      <!-- <a-button-group style="width: 100%"> -->
      <a-row style="padding: 0 10px 0 10px;">
        <a-col :span="16">
          <a-button class="customButton" size="large" type="primary" @click="showDrawer">已选择 [{{ totalSelectItem}}]</a-button>
        </a-col>
        <a-col :span="8">
          <a-button class="customButton" size="large" type="primary" @click="startEdit();handleRoute()">
            确认
          </a-button>
        </a-col>
      </a-row>
      <!-- </a-button-group> -->
    </div>
  </div>
</template>
<style lang="less">
.demo-infinite-container {
  padding: 0;
}
.customButton {
  width: 100%;
}
</style>
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
      editVisible: false,
      // test_data_list: test_data
    };
  },

  methods: {
    handleRoute() {
      this.description = this.shopingCart.map(d => d.description).join("\n");
      this.$router.push({path: '/share', query: { text: this.description}})
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
        var tmp_dict;
        for (var item of response.data) {
          tmp_dict = {
            description: item,
            visible: true
          }; 
          this.searchContent.push(tmp_dict);
        }
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
    startEdit() {
      var tmp_list = [];
      for (var item of this.shopingCart) {
        tmp_list.push(item.description);
      }
      this.description = tmp_list.join("\n");
    },
    openNotification() {
      const key = `open${Date.now()}`;
      this.$notification.config({
        duration: 0
      });
      this.$notification.open({
        message: "注意",
        description:
          '是否确认清空购物车？',
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
.drawer-container {
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 200px;
}
</style>
