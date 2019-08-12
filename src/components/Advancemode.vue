<template>
  <div class="modetwo">
    <!-- 搜索显示列表 -->
    <div
      class="demo-infinite-container"
    >
      <a-list :dataSource="test_data_list">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div class="list-item">
            <a-list-item-meta :description="item.description">
              <!-- <a slot="title">{{item.title}}</a>
              <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />-->
            </a-list-item-meta>
          </div>
          <div class="add-function-button">
            <!-- <a-button
              type="primary"
              shape="circle"
              icon="copy"
              @click="doCopy(index)"
              :size="size"
            />-->

            <a-button
              v-if="item.visible"
              style="float: right;"
              type="primary"
              shape="circle"
              icon="plus"
              @click="addCart(index)"
              :size="size"
            />
            <a-button
              v-else
              style="float: right;"
              type="primary"
              shape="circle"
              icon="minus"
              @click="removeCart(index)"
              :size="size"
            />
          </div>
        </a-list-item>
        <!-- <div v-if="loading && !busy" class="demo-loading-container">
            <a-spin />
        </div>-->
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
            <div class="list-item">
              {{ item.description }}
              <a-button
                style="float: right;"
                type="primary"
                shape="circle"
                icon="minus"
                @click="removeCart(item.index)"
                :size="size"
              />
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
          @click="showEditDrawer();startEdit()"
        >
          编辑 ({{ totalDescription }})
        </a-button>
        <a-button @click="openNotification" type="primary">清空</a-button>
      </div>
    </a-drawer>

    <!-- 编辑页 -->
    <a-drawer
      title="Edit"
      :height="500"
      placement="bottom"
      :closable="false"
      @close="onEditClose"
      :visible="editVisible"
    >

      <!-- <div class="drawer-container">
        <a-textarea :placeholder="description" :rows="6"/>
      </div> -->
      <a-textarea :defaultValue="description" :rows="14"/>

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
        <!-- <a-button
          :style="{marginRight: '8px'}"
          @click="onClose"
        >
          close
        </a-button> -->
        <a-button  type="primary">完成编辑</a-button>
      </div>
    </a-drawer>
    
    <a-button type="primary" @click="go">Open</a-button>

    <div class="shop-footer">
      <a-row>
        <a-col :span="16"></a-col>
        <a-col :span="8">
          <a-button type="primary" @click="showDrawer">Open</a-button>
        </a-col>
      </a-row>
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
      editVisible: false,
      test_data_list: test_data
    };
  },

  methods: {
    addCart(idx) {
      this.shopingCart.push({
        index: idx,
        description: this.test_data_list[idx].description
      });
      this.test_data_list[idx].visible = false;
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
      this.test_data_list[idx].visible = true;
    },
    clearCart() {
      for (var item of this.test_data_list) {
        item.visible = true;
      };
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
        this.searchContent = response.data;
        me.spinning = !me.spinning;
      });
    },
    go() {
      this.$router.push('/hello')
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
    showEditDrawer() {
      this.editVisible = true;
    },
    onEditClose() {
      this.editVisible = false;
    },
    startEdit() {
      var tmp_list = [];
      for (var item of this.shopingCart) {
        tmp_list.push(item.description);
      };
      this.description = tmp_list.join("\n")
    },
    openNotification () {
        const key = `open${Date.now()}`;
        this.$notification.config({
          duration: 0,
        });
        this.$notification.open({
          message: 'Notification Title',
          description: 'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
          btn: (h)=>{
            return h('a-button', {
              props: {
                type: 'primary',
                size: 'small',
              },
              on: {
                click: () => {
                  this.clearCart();
                  this.$notification.close(key);
                  this.onClose();
                }
              }
            }, 'Confirm')
          },
          key,
        });
      },
    onChange(e) {
      this.placement = e.target.value;
    }
  },

  computed: {
    totalDescription () {
      let total = 0;
      for (let i=0; i < this.shopingCart.length; i++) {
        total += 1;
      };
      return total;
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
.drawer-container{
    border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  height: 200px;
}
</style>
