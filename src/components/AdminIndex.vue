<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-side></v-side>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import vHead from "./Header";
import vSide from "./Sidebar";
import event from "./event";
import vTags from "./Tags";
export default {
  name: "AdminIndex",
  data() {
    return {
      collapse: false,
      level: -1,
      tagsList: []
    };
  },
  components: {
    vHead,
    vSide,
    vTags
  },

  mounted: function() {
    this.initData();
  },
  methods: {
    initData() {
      //console.log(this.$store.state);
      // console.log(localStorage.getItem("name"));
      // console.log(localStorage.getItem("level"));
      // this.name = this.$store.state.name;
      // this.level = this.$store.state.level;
      // this.name = this.username;
      // this.level = this.userlevel;
      this.name = localStorage.getItem("name");
      this.level = localStorage.getItem("level");
      event.$emit("name", this.name);
      event.$emit("level", this.level);
    },
    chageCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  },
  created() {
    event.$on("collapse-content", msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，
    // 即关闭标签之后就不保存到内存中了。

    event.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name;
        arr.push(msg[i].name);
      }
      //console.log(arr);
      this.tagsList = arr;
    });
  }
};
</script>

  

