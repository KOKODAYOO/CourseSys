<template>
  <div class="wrapper">
    <van-row class="m-header">
      <van-col span="24">{{currIndex}}</van-col>
    </van-row>
    
    <van-tabbar v-model="active" fixed class="footer">
      <van-tabbar-item
        v-for="(item,index) in tabbars"
        :key="index"
        @click="tab(item.title,item.name)"
        :icon="item.icon"
      >{{item.title}}</van-tabbar-item>
    </van-tabbar>

    <div class="content">
      <router-view></router-view>
      <el-backtop target=".content"></el-backtop>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyIndex",
  data() {
    return {
      currIndex: "主页",
      active: 0,
      tabbars: [
        {
          name: "myClass",
          title: "主页",
          icon: "home-o"
        },
        {
          name: "selectClass",
          title: "选课",
          icon: "friends-o"
        },
        {
          name: "myGrades",
          title: "成绩",
          icon: "notes-o"
        },
        {
          name: "myInfo",
          title: "信息",
          icon: "user-circle-o"
        }
      ]
    };
  },
  methods: {
    tab(title, val) {
      this.currIndex = title;
      this.$router.push(val);
    }
  }
};
</script>

<style scoped>
.m-header {
  height: 60px;
  line-height: 60px;
  /* background: #2460d7d3; */
  background: linear-gradient(to left, #4bb0ff, #6149f6);
  color: #fff;
}

.m-header-icon {
  position: absolute;
  top: 16px;
  left: 6px;
  font-size: 18px;
}

.footer {
  height: 60px;
  background: linear-gradient(to right, #4bb1ff2d, #4bb1ff34);
  /* background-color:  #4bb1ff5d; */
}

.content {
  height: 740px;
  padding: 1px;
  background-color: #ebe7e659;
}
</style>