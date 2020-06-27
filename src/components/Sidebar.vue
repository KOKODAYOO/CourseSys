<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.level == userlevel">
          <!-- 多级菜单 -->
          <template v-if="item.subs">
            <el-submenu :index="item.index" :key="item.index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </template>
              <template v-for="subItem in item.subs">
                <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                  <template slot="title">{{ subItem.title }}</template>
                  <el-menu-item
                    v-for="(threeItem,i) in subItem.subs"
                    :key="i"
                    :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item>
                </el-submenu>
                <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
              </template>
            </el-submenu>
          </template>
          <!-- 一级菜单 -->
          <template v-else>
            <el-menu-item :index="item.index" :key="item.index">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import event from "./event";
export default {
  name: "Sidebar",
  data() {
    return {
      collapse: false,
      userlevel: 1,
      items: [
        {
          icon: "el-icon-s-home",
          level: 0,
          index: "adminList",
          title: "管理员列表"
        },
        {
          icon: "el-icon-user-solid",
          level: 0,
          index: "2",
          title: "人员管理",
          subs: [
            {
              index: "teacherManager",
              title: "教师管理"
            },
            {
              index: "studentManager",
              title: "学生管理"
            }
          ]
        },
        {
          icon: "el-icon-menu",
          level: 0,
          index: "3",
          title: "信息管理",
          subs: [
            {
              index: "collegeManager",
              title: "学院信息"
            },
            {
              index: "specManager",
              title: "专业信息"
            },
            {
              index: "classManager",
              title: "班级信息"
            }
          ]
        },
        {
          icon: "el-icon-eleme",
          level: 0,
          index: "courseManager",
          title: "课程管理"
        },
        {
          icon: "el-icon-s-management",
          level: 1,
          index: "TCManager",
          title: "课程登记"
        },
        {
          icon: "el-icon-document-checked",
          level: 1,
          index: "TGManager",
          title: "成绩登记"
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event进行组件间通信，来折叠侧边栏
    event.$on("collapse", msg => {
      this.collapse = msg;
      event.$emit("collapse-content", msg);
    });

    event.$on("level", msg => {
      this.userlevel = msg;
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
  text-align: left;
}
.sidebar ul {
  height: 100%;
}
</style>
