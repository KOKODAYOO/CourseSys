<template>
  <div>
    <template v-if="status==false">
      <van-empty class="content" description="还没有成绩哦" />
    </template>

    <template v-else>
      <el-card class="card">
        <div class="title">我的成绩</div>
        <van-cell />

        <el-table tooltip-effect="dark" :data="gradesData" style="width: 100%">
          <el-table-column align="center" prop="course" label="课程" width="180"></el-table-column>
          <el-table-column align="center" prop="sorce" label="学分" width="90"></el-table-column>
          <el-table-column align="center" prop="grades" label="成绩"></el-table-column>
        </el-table>
      </el-card>
    </template>
  </div>
</template>

<script>
export default {
  name: "GradesPages",
  mounted: function() {
    this.initData();
  },
  data() {
    return {
      status: true,
      gradesData: []
    };
  },
  methods: {
    initData() {
      var id = localStorage.getItem("id");
      var sch_year = localStorage.getItem("sch_year");
      var semester = localStorage.getItem("semester");
      //console.log(id,sch_year,semester);
      if (id == null || semester == null || sch_year == null) {
        this.$message({
          type: "error",
          message: "出现错误，请重新登录"
        });
        return;
      }
      var url =
        "http://localhost:8082/stu/getGrades?id=" +
        id +
        "&sch_year=" +
        sch_year +
        "&semester=" +
        semester;
      this.$axios.get(url).then(res => {
        //console.log(res);
        //var data = res.data.data.list;
        this.gradesData = res.data.data.list;
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
  margin-top: 30px;
  height: 680px;
  border-radius: 3em;
}

.title {
  text-align: center;
  font-size: x-large;
  font-weight: bolder;
}

.van-field {
  font-size: x-large;
}
.van-button {
  margin-top: 5em;
}
</style>