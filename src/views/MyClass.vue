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
import { Dialog } from "vant";
export default {
  name: "MyClass",
  mounted: function() {
    this.initClass();
  },
  data() {
    return {
      classStatus: true,
      msg: "选课已开放",
      status: true,
      data: []
    };
  },
  methods: {
    initClass() {
      //init
      let id = localStorage.getItem("id");
      //console.log(id);
      this.$axios.get("http://localhost:8082/info/getStatus").then(res => {
        //console.log(res);
        this.classStatus = res.data.data.status.course_status;
        //console.log(this.status);
      });
      this.$axios
        .get("http://localhost:8082/info/getCourseTableById?id=" + id)
        .then(res => {
          
          if (res.data.code == 200) {
            
            this.data = res.data.data.list;
            // var timetables = [
            //   [
            //     "大学英语@2N211",
            //     "大学英语@2N211",
            //     "",
            //     "",
            //     "毛概@14208",
            //     "毛概@14208",
            //     "毛概@14208",
            //     "",
            //     "",
            //     "",
            //     "",
            //     ""
            //   ],
            //   ["", "", "", "", "数据库实践", "数据库实践", "", "", "", "", "", ""],
            //   [
            //     "大学体育(Ⅳ)",
            //     "大学体育(Ⅳ)",
            //     "形势与政策(Ⅳ)@15208",
            //     "形势与政策(Ⅳ)@15208",
            //     "",
            //     "",
            //     "电路、信号与系统实验",
            //     "电路、信号与系统实验",
            //     "",
            //     "",
            //     "",
            //     ""
            //   ],
            //   [
            //     "",
            //     "",
            //     "",
            //     "",
            //     "软件测试@2N301",
            //     "软件测试@2N301",
            //     "",
            //     "",
            //     "",
            //     "大学体育",
            //     "大学体育",
            //     ""
            //   ],
            //   [
            //     "",
            //     "",
            //     "数据结构与算法分析",
            //     "数据结构与算法分析",
            //     "",
            //     "",
            //     "",
            //     "",
            //     "项目管理@2N311",
            //     "项目管理@2N311",
            //     "",
            //     ""
            //   ]
            // ];

            var timetables = [
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""],
              ["", "", "", "", "", "", "", "", "", "", "", ""]
            ];

            for (var i = 0; i < this.data.length; i++) {
              if (this.data[i].course_time == "1") {
                timetables[this.data[i].course_day][0] = this.data[i].name;
                timetables[this.data[i].course_day][1] = this.data[i].name;
              } else if (this.data[i].course_time == "2") {
                timetables[this.data[i].course_day][2] = this.data[i].name;
                timetables[this.data[i].course_day][3] = this.data[i].name;
              } else if (this.data[i].course_time == "3") {
                timetables[this.data[i].course_day][2] = this.data[i].name;
                timetables[this.data[i].course_day][3] = this.data[i].name;
                timetables[this.data[i].course_day][4] = this.data[i].name;
              } else if (this.data[i].course_time == "4") {
                timetables[this.data[i].course_day][5] = this.data[i].name;
                timetables[this.data[i].course_day][6] = this.data[i].name;
              } else if (this.data[i].course_time == "5") {
                timetables[this.data[i].course_day][5] = this.data[i].name;
                timetables[this.data[i].course_day][6] = this.data[i].name;
                timetables[this.data[i].course_day][7] = this.data[i].name;
              } else if (this.data[i].course_time == "6") {
                timetables[this.data[i].course_day][7] = this.data[i].name;
                timetables[this.data[i].course_day][8] = this.data[i].name;
              } else if (this.data[i].course_time == "7") {
                timetables[this.data[i].course_day][9] = this.data[i].name;
                timetables[this.data[i].course_day][10] = this.data[i].name;
                timetables[this.data[i].course_day][11] = this.data[i].name;
              }
            }

            var timetableType = [
              [{ index: "1", name: "8:10" }, 1],
              [{ index: "2", name: "9:00" }, 1],
              [{ index: "3", name: "10:00" }, 1],
              [{ index: "4", name: "10:50" }, 1],
              [{ index: "5", name: "11:35" }, 1],
              [{ index: "6", name: "13:30" }, 1],
              [{ index: "7", name: "14:30" }, 1],
              [{ index: "8", name: "15:15" }, 1],
              [{ index: "9", name: "16:05" }, 1],
              [{ index: "10", name: "18:30" }, 1],
              [{ index: "11", name: "19:20" }, 1],
              [{ index: "12", name: "20:10" }, 1]
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
          } else {
            this.status = false;
          }
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