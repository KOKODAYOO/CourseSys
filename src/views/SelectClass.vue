<template>
  <div>
    <template v-if="status==false">
      <van-empty class="content" description="还没到选课的时候呀！" />
    </template>

    <template v-else>
      <el-card class="card">
        <div class="title">可选课程</div>
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          :data="selectData"
          @selection-change="handleSelectionChange"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="课程">
                  <span>{{ props.row.course}}</span>
                </el-form-item>
                <el-form-item label="地点">
                  <span>{{ props.row.place }}</span>
                </el-form-item>
                <el-form-item label="学分">
                  <span>{{ props.row.point}}</span>
                </el-form-item>
                <el-form-item label="老师">
                  <span>{{ props.row.teacher }}</span>
                </el-form-item>
                <el-form-item label="容量">
                  <span>{{ props.row.now_number }}/{{ props.row.total_number }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="course" label="课程" width="180"></el-table-column>
          <el-table-column prop="point" label="学分" width="90"></el-table-column>
          <el-table-column prop="teacher" label="老师"></el-table-column>
        </el-table>
        <el-button type="success" @click="selectClasses" round>选课</el-button>
      </el-card>
      <van-divider class="linear"></van-divider>
      <el-card class="card">
        <div class="title">已选课程</div>
        <el-table
          ref="multipleTable"
          tooltip-effect="dark"
          :data="courseData"
          @selection-change="DhandleSelectionChange"
          style="width: 100%"
        >
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="课程">
                  <span>{{ props.row.course}}</span>
                </el-form-item>
                <el-form-item label="地点">
                  <span>{{ props.row.place }}</span>
                </el-form-item>
                <el-form-item label="学分">
                  <span>{{ props.row.point}}</span>
                </el-form-item>
                <el-form-item label="老师">
                  <span>{{ props.row.teacher }}</span>
                </el-form-item>
                <el-form-item label="容量">
                  <span>{{ props.row.now_number }}/{{ props.row.total_number }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column prop="course" label="课程" width="180"></el-table-column>
          <el-table-column prop="point" label="学分" width="90"></el-table-column>
          <el-table-column prop="teacher" label="老师"></el-table-column>
        </el-table>

        <el-button type="danger" @click="DropClasses" round>退课</el-button>
      </el-card>
    </template>
  </div>
</template>

<script>
export default {
  name: "selectClass",
  mounted: function() {
    this.initData();
  },
  data() {
    return {
      status: true,
      multipleSelection: [],
      DmultipleSelection: [],
      selectData: [],
      courseData: []
    };
  },
  methods: {
    initData() {
      var id = localStorage.getItem("id");
      if (id == null) {
        this.$message({
          type: "error",
          message: "出现错误，请重新登录"
        });
        return;
      }
      var url = "http://localhost:8082/stu/getStuInfo?id=" + id;

      var s_id = "";
      this.$axios.get(url).then(res => {
        // console.log(res);
        s_id = res.data.data.list[0].s_id;

        this.$axios
          .get(
            "http://localhost:8082/stu/getClassBySid?id=" + s_id + "&uid=" + id
          )
          .then(res => {
            //console.log(res);
            this.selectData = res.data.data.list;
          });
      });

      this.$axios
        .get("http://localhost:8082/stu/getSelectedClassBySid?id=" + id)
        .then(res => {
          //console.log(res);
          this.courseData = res.data.data.list;
        });
    },
    handleSelectionChange(val) {
      //console.log(val);
      this.multipleSelection = val;
    },
    DhandleSelectionChange(val) {
      //console.log(val);
      this.DmultipleSelection = val;
    },
    DropClasses() {
      //console.log(this.DmultipleSelection);
      for (var i = 0; i < this.DmultipleSelection.length; i++) {
        var item = {
          course: this.DmultipleSelection[i].id,
          user_id: localStorage.getItem("id")
        };

        this.$axios
          .post(
            "http://localhost:8082/stu/dropClass",
            this.qs.stringify(item)
          )
          .then(res => {
            //console.log(res);
            location.reload();
          })
          .catch(error => {
            console.log(error); //请求失败返回的数据
          });
      }
      
    },
    selectClasses() {
      //console.log(this.multipleSelection);
      for (var i = 0; i < this.multipleSelection.length; i++) {
        var item = {
          course: this.multipleSelection[i].id,
          user_id: localStorage.getItem("id")
        };

        this.$axios
          .post(
            "http://localhost:8082/stu/selectClass",
            this.qs.stringify(item)
          )
          .then(res => {
            //console.log(res);
            location.reload();
          })
          .catch(error => {
            console.log(error); //请求失败返回的数据
          });
      }
    }
  }
};
</script>
<style scoped>
.content {
  height: 740px;
}

.card {
  margin-top: 0.5em;
  border-radius: 2em;
}

.title {
  text-align: left;
  font-weight: bolder;
  margin-bottom: 0.8em;
}

.el-button {
  margin-top: 1em;
}

.linear {
  width: 100%;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    rgba(35, 198, 200, 0.3) 10%,
    rgba(35, 198, 200, 0.3) 20%,
    rgba(35, 198, 200, 0.4) 30%,
    rgba(35, 198, 200, 0.5) 40%,
    rgba(35, 198, 200, 0.8) 50%,
    rgba(35, 198, 200, 0.5) 60%,
    rgba(35, 198, 200, 0.4) 70%,
    rgba(35, 198, 200, 0.3) 80%,
    rgba(35, 198, 200, 0.3) 90%,
    rgba(0, 0, 0, 0) 100%
  );
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>