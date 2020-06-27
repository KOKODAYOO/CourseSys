<template>
  <div>
    <template v-if="classStatus==true">
      <van-notice-bar wrapable :scrollable="false" mode="closeable">{{msg}}</van-notice-bar>
    </template>
    <template v-if="status==false">
      <van-empty class="content" description="没有课啦！" />
    </template>

    <template v-else></template>
    <el-card class="card">
      <div id="coursesTable"></div>
    </el-card>
  </div>
</template>


<script>
import Timetables from "timetables";
import { Dialog } from 'vant';
export default {
  name: "MyClass",
  mounted: function() {
    this.initClass();
  },
  data() {
    return {
      classStatus: true,
      msg:"选课已开放",
      status: true
    };
  },
  methods: {
    initClass() {
      //init
      
      //Course
      var timetables = [
        [
          "大学英语@2N211",
          "大学英语@2N211",
          "",
          "",
          "毛概@14208",
          "毛概@14208",
          "毛概@14208",
          "",
          "",
          "",
          "",
          ""
        ],
        [
          "",
          "",
          "",
          "",
          "数据库实践",
          "数据库实践",
          "",
          "",
          "",
          "",
          "",
          ""
        ],
        [
          "大学体育(Ⅳ)",
          "大学体育(Ⅳ)",
          "形势与政策(Ⅳ)@15208",
          "形势与政策(Ⅳ)@15208",
          "",
          "",
          "电路、信号与系统实验",
          "电路、信号与系统实验",
          "",
          "",
          "",
          ""
        ],
        [
          "",
          "",
          "",
          "",
          "软件测试@2N301",
          "软件测试@2N301",
          "",
          "",
          "",
          "大学体育",
          "大学体育",
          ""
        ],
        [
          "",
          "",
          "数据结构与算法分析",
          "数据结构与算法分析",
          "",
          "",
          "",
          "",
          "项目管理@2N311",
          "项目管理@2N311",
          "",
          ""
        ]
      ];
      var timetableType = [
        [{ index: "1", name: "8:10" }, 1],
        [{ index: "2", name: "9:45" }, 1],
        [{ index: "3", name: "10:00" }, 1],
        [{ index: "4", name: "11:45" }, 1],
        [{ index: "5", name: "13:30" }, 1],
        [{ index: "6", name: "15:00" }, 1],
        [{ index: "7", name: "15:55" }, 1],
        [{ index: "8", name: "16:50" }, 1],
        [{ index: "9", name: "17:30" }, 1],
        [{ index: "10", name: "18:30" }, 1],
        [{ index: "11", name: "19:30" }, 1],
        [{ index: "12", name: "20:30" }, 1]
      ];
      var week = ["周一", "周二", "周三", "周四", "周五"];
      var highlightWeek = new Date().getDay();
      var styles = {
        Gheight: 50,
        leftHandWidth: 50,
        palette: ["#ff6633", "#e01313"]
      };

      // 实例化(初始化课表)
      var Timetable = new Timetables({
        el: "#coursesTable",
        timetables: timetables,
        week: week,
        timetableType: timetableType,
        highlightWeek: highlightWeek,
        gridOnClick: function(e) {
          Dialog.alert({
            //title: '标题',
            message:
              e.name +
              "  " +
              e.week +
              ", 第" +
              e.index +
              "节课, 课长" +
              e.length +
              "节"
          }).then(() => {
            // on close
          });
        },
        styles: styles
      });
    }
  }
};
</script>
<style scoped>
.content {
  height: 740px;
}

.card {
  margin-top: 10px;
  height: 740px;
  background: rgba(255, 255, 255, 0.034);
}
</style>