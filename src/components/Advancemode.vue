<template>
  <div class="modetwo">
    <!-- 搜索显示列表 -->
    <div
      class="demo-infinite-container"
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="15"
      style="    overflow: auto;
        padding: 8px 24px;
        height: 500px;
        width: 50%;
        float: left;"
    >
      <a-list :dataSource="searchContent">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <div style="margin-left:1%;margin-top:0.7%;">
            <a-icon type="scissor" />
          </div>
          <div class="list-item">
            <a-list-item-meta :description="item.description">
              <a slot="title">{{item.title}}</a>
            </a-list-item-meta>
          </div>
          <div class="add-function-button" style="width:12%;">
            <a-button
              type="primary"
              shape="circle"
              icon="copy"
              @click="doCopy(index)"
              :size="size"
            />
            <a-button
              style="margin-left:20%;"
              type="primary"
              shape="circle"
              icon="plus"
              @click="addCart(index)"
              :size="size"
            />
          </div>
        </a-list-item>
      </a-list>
    </div>

    <!-- <div
      class="demo-infinite-container"
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="15"
    >
        <a-list :dataSource="shopingCart">
          <a-list-item slot="renderItem" 
            slot-scope="item, index">
            <div class="list-item" >
              <a-list-item-meta :description="item.description"></a-list-item-meta>
            </div>
          </a-list-item>
        </a-list>
    </div>-->

    <div
      class="demo-cartboard"
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="15"
      style="overflow: auto;
        padding: 8px 24px;
        height: 500px;
        width: 50%;
       "
    >
      <!-- <br />
      <br />-->
      <!-- <a-textarea v-model="description"  :rows="14" /> -->
      <!-- <quill-editor
        class="editor"
        v-model="description"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
        style="width: 100%; height: 250px "
        :rows="14"
      ></quill-editor>-->
      <div id="vue-wangeditor" ref="editor"></div>
      

      <br />
      <br />
      <a-button size="large" @click="doCopyCart">
        <a-icon type="copy" />复制
      </a-button>
    </div>
  </div>
</template>

<script type="text/javascript">
import WangEditor from "wangeditor";
// default WangEditor menu config
const DEFAULT_MENUS = [
  "head",
  "bold",
  "italic",
  "underline",
  "strikeThrough",
  "foreColor",
  "backColor",
  "link",
  "list",
  "justify",
  "quote",
  "emoticon",
  "image",
  "table",
  "video",
  "code",
  "undo",
  "redo"
];
export default {
  name: "VueWangEditor",
  // @props {string} content html string
  // @props {object} menus
  props: ["value", "menus"],
  data() {
    return {
      // instance of wangEditor
      instance: null
    };
  },
  methods: {
    // init dom and WangEditor instance
    init() {
      this.$set(this, "instance", new WangEditor(this.$refs.editor));
      this.instance.customConfig.menus = this.weMenus;
      this.instance.customConfig.onchange = html => {
        this.$nextTick(_ => {
          this.$emit("input", html);
        });
      };
      this.instance.create();
      this.instance.txt.html(this.value);
    }
  },
  watch: {
    value(nv, ov) {
      if (!this.instance) {
        return;
      }
      let currentHTML = this.instance.txt.html();
      if (currentHTML !== nv) {
        this.instance.txt.html(nv);
      }
    }
  },
  computed: {
    weMenus() {
      if (this.menus && this.menus instanceof Array && this.menus.length) {
        return this.menus;
      } else {
        return DEFAULT_MENUS;
      }
    }
  },
  watch: {
    value() {
      this.instance.txt.html(this.value);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<script>
/* eslint-disable */
const API = "http://deecamp.tangkailh.cn:10081/";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "Advancemode",

  components: {
    quillEditor
  },
  data() {
    return {
      editorOption: {},
      description: "",
      searchContent: [],
      size: "small",
      shopingCart: [],
      spinning: false,
      visible: true
    };
  },

  methods: {
    onEditorBlur() {},
    onEditorFocus() {},
    onEditorChange() {},

    addCart(index) {
      this.shopingCart.push({
        index: index,
        description: this.searchContent[index].description
      });
      this.description = this.shopingCart.map(d => d.description).join("\n");
      // this.content = this.shopingCart.map(d => d.description).join("\n");
      this.searchContent[index].visible = false;
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

    doCopy(index) {
      this.$message.success("Copyed!", 1);
      this.$copyText(this.searchContent[index].description).then(
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

    doCopyCart() {
      this.$message.success("Copyed!", 1);
      this.$copyText(this.description.slice(3, -4)).then(
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
        // this.searchContent = response.data;
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
  width: 80%;
  margin-left: 5%;
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

.ql-toolbar.ql-snow {
  text-align: left;
}
.ql-toolbar.ql-snow .ql-formats {
  margin-right: 0px;
  margin: 5%;
}
</style>
