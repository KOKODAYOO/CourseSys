<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="chageCollapse">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>

    <div class="logo">课程管理系统</div>

    <div class="header-right">
      <div class="header-user-con">
        <div class="user-avator">
          <img src="../assets/avatar2.jpg" />
        </div>
        <div class="user-name">
          <span>{{name}}</span>
        </div>
        <div class="btn-logout" @click="logout">
          <el-tooltip effect="dark" :content="`注销`" placement="bottom">
            <i class="el-icon-switch-button"></i>
          </el-tooltip>
        </div>
        <div class="btn-full" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="full?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import event from "./event";
export default {

  data() {
    return {
      collapse: false,
      full: false,
      name: "Admin"
    };
  },
  methods: {
    initData() {
      event.$on("name", msg => {
        this.name = msg;
      });
    },
    //展开
    chageCollapse() {
      this.collapse = !this.collapse;
      event.$emit("collapse", this.collapse);
    },
    //全屏
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    logout() {
      localStorage.clear();
      this.$router.push("/admin");
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.chageCollapse();
    }
  },
  created(){
    this.initData();
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  position: absolute;
  right: 0;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}

.btn-logout {
  position: relative;
  left: 5px;
  font-size: 32px;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.btn-full {
  position: relative;
  transform: rotate(45deg);
  left: 5px;
  font-size: 32px;
  width: 40px;
  height: 40px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.logout {
  position: relative;
  margin-left: 20px;
  font-size: 32px;
  color: rgb(245, 239, 239);
}
</style>