<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-files"></i>课程管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-button type="success" icon="el-icon-plus" size="small" @click="handleAdd">新建</el-button>
      </div>

      <el-table
        :data="tableData"
        stripe
        class="table"
        header-cell-class-name="table-header"
        :default-sort="{prop: 'id', order: 'ascending'}"
      >
        <el-table-column prop="id" label="ID" width="70px" sortable align="center"></el-table-column>
        <el-table-column
          prop="sch_year"
          label="学年"
          sortable
          align="center"
          column-key="sch_year"
          :filter-method="filterYear"
          :filters="time_list"
        ></el-table-column>
        <el-table-column
          prop="semester"
          label="学期"
          sortable
          align="center"
          column-key="semester"
          :filter-method="filterSemeter"
          :filters="semester_list"
        ></el-table-column>
        <el-table-column prop="name" label="课程" sortable align="center"></el-table-column>
        <el-table-column prop="spec" label="专业" sortable align="center"></el-table-column>
        <el-table-column prop="total_number" label="人数" sortable align="center"></el-table-column>
        <el-table-column prop="sorce" label="学分" sortable align="center"></el-table-column>
        <el-table-column label="状态" sortable align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.status==0?'未开始':(scope.row.status==1?'进行':'结束')}}</template>
        </el-table-column>
        <el-table-column label="选项" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button type="text" icon="el-icon-user" @click="handleTe(scope.$index, scope.row)">添加</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="课程名称">
          <el-input placeholder="请输入内容" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input placeholder="请输入内容" v-model="form.des"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="form.s_id" placeholder="请选择">
            <el-option v-for="item in spec" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人数">
          <el-input placeholder="请输入内容" v-model="form.total_number"></el-input>
        </el-form-item>
        <el-form-item label="学分">
          <el-input placeholder="请输入内容" v-model="form.sorce"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input placeholder="请输入内容" v-model="form.place"></el-input>
        </el-form-item>
        <el-form-item label="时间1">
          <el-select v-model="form.course_day" placeholder="上课时间">
            <el-option
              v-for="item in course_days"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间2">
          <el-select v-model="form.course_time" placeholder="上课时间">
            <el-option
              v-for="item in course_times"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新建" :visible.sync="addVisible" width="400px">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="课程名称">
          <el-input placeholder="请输入内容" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input placeholder="请输入内容" v-model="form.des"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="form.s_id" placeholder="请选择">
            <el-option v-for="item in spec" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人数">
          <el-input placeholder="请输入内容" v-model="form.total_number"></el-input>
        </el-form-item>
        <el-form-item label="学分">
          <el-input placeholder="请输入内容" v-model="form.sorce"></el-input>
        </el-form-item>
        <el-form-item label="地点">
          <el-input placeholder="请输入内容" v-model="form.place"></el-input>
        </el-form-item>
        <el-form-item label="时间1">
          <el-select v-model="form.course_day" placeholder="上课时间">
            <el-option
              v-for="item in course_days"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间2">
          <el-select v-model="form.course_time" placeholder="上课时间">
            <el-option
              v-for="item in course_times"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 授课弹出框 -->
    <el-dialog title="教师列表" :visible.sync="teVisible" width="400px">
      <div class="handle-box">
        <el-select v-model="form.teacher_id" placeholder="请选择老师">
          <el-option v-for="item in teacherList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-button type="success" icon="el-icon-plus" size="small" @click="AddT">新建</el-button>
      </div>
      <el-table
        :data="teachers"
        stripe
        class="table"
        header-cell-class-name="table-header"
        :default-sort="{prop: 'account', order: 'ascending'}"
      >
        <el-table-column prop="account" label="工号" sortable align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" sortable align="center"></el-table-column>
        <el-table-column label="选项" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              v-if="user_id != scope.row.user_id"
              @click="DeleteTe(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="teVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TCManager",
  data() {
    return {
      query: {
        name: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      depart_id: 1,
      delList: [],
      user_id: 0,
      editVisible: false,
      addVisible: false,
      teVisible: false,
      pageTotal: 0,
      teacherList: [],
      form: {},
      idx: -1,
      id: -1,
      time_list: [
        { text: "2017", value: 2017 },
        { text: "2018", value: 2018 },
        { text: "2019", value: 2019 },
        { text: "2020", value: 2020 }
      ],
      semester_list: [
        { text: "1", value: 1 },
        { text: "2", value: 2 }
      ],
      course_id: 0,
      options: [],
      spec: [],
      teachers: [],
      course_days: [
        {
          id: "1",
          name: "星期一"
        },
        {
          id: "2",
          name: "星期二"
        },
        {
          id: "3",
          name: "星期三"
        },
        {
          id: "4",
          name: "星期四"
        },
        {
          id: "5",
          name: "星期五"
        }
      ],
      course_times: [
        {
          id: "1",
          name: "1、2节"
        },
        {
          id: "2",
          name: "3、4节"
        },
        {
          id: "3",
          name: "3、4、5节"
        },
        {
          id: "4",
          name: "6、7节"
        },
        {
          id: "5",
          name: "6、7、8节"
        },
        {
          id: "6",
          name: "8、9节"
        },
        {
          id: "7",
          name: "10、11、12节"
        }
      ]
    };
  },
  mounted: function() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      let id = localStorage.getItem("id");
      this.user_id = localStorage.getItem("id");
      var url = "http://localhost:8082/info/getCourseById?id=" + id;
      this.$axios.get(url).then(res => {
        //console.log(res);
        this.tableData = res.data.data.list;
        this.pageTotal = this.tableData.length || 10;
      });

      this.$axios
        .get("http://localhost:8082/info/getTeacherDepartById?id=" + id)
        .then(res => {
          //console.log(res);
          this.depart_id = res.data.data.list[0].depart_id;
          this.$axios
            .get(
              "http://localhost:8082/info/getSpec?depart_id=" + this.depart_id
            )
            .then(res => {
              //console.log(res);
              this.spec = res.data.data.list;
              //console.log(this.depart_id);
            });
          //console.log(this.depart_id);
        });

      this.$axios
        .get("http://localhost:8082/info/getSpec?depart_id=" + this.depart_id)
        .then(res => {
          //console.log(res);
          this.spec = res.data.data.list;
          //console.log(this.depart_id);
        });

      this.$axios
        .get(
          "http://localhost:8082/user/getTeacherByDepart?depart_id=" +
            this.depart_id
        )
        .then(res => {
          //console.log(res);
          this.teacherList = res.data.data.list;
          //console.log(this.options);
        });
    },
    // 删除操作
    handleDelete(index, row) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          const h = this.$createElement;
          var url = "http://localhost:8082/info/deleteCourse?id=" + row.id;
          this.$axios
            .get(url)
            .then(res => {
              //console.log(res);
              if (res.data.code == 200) {
                this.$notify.success({
                  title: "成功",
                  message: h("i", { style: "color: teal" }, res.data.msg)
                });
                location.reload();
              } else {
                this.$notify.error({
                  title: "错误",
                  message: h("i", { style: "color: teal" }, res.data.msg)
                });
              }
            })
            .catch(error => {
              console.log(error); //请求失败返回的数据
            });
        })
        .catch(() => {});
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      const h = this.$createElement;
      //console.log(this.form);
      var item = {
        id: this.form.id,
        name: this.form.name,
        total_number: this.form.total_number,
        s_id: this.form.s_id,
        des: this.form.des,
        sorce: this.form.sorce,
        place: this.form.place,
        course_day: this.form.course_day,
        course_time: this.form.course_time
      };
      console.log(item);
      this.$axios
        .post(
          "http://localhost:8082/info/modifyCourse",
          this.qs.stringify(item)
        )
        .then(res => {
          //console.log(res);
          if (res.data.code == 200) {
            this.$notify.success({
              title: "成功",
              message: h("i", { style: "color: teal" }, res.data.msg)
            });
            location.reload();
          } else {
            this.$notify.error({
              title: "错误",
              message: h("i", { style: "color: teal" }, "修改失败")
            });
          }
        })
        .catch(error => {
          console.log(error); //请求失败返回的数据
        });
    },
    // 添加操作
    handleAdd() {
      this.form = {};
      this.addVisible = true;
    },
    // 保存新建
    saveAdd() {
      this.addVisible = false;
      this.form.user_id = localStorage.getItem("id");
      const h = this.$createElement;
      this.$axios
        .post(
          "http://localhost:8082/info/newCourse",
          this.qs.stringify(this.form)
        )
        .then(res => {
          //console.log(res);
          if (res.data.code == 200) {
            this.$notify.success({
              title: "成功",
              message: h("i", { style: "color: teal" }, res.data.msg)
            });
            location.reload();
          } else {
            this.$notify.error({
              title: "错误",
              message: h("i", { style: "color: teal" }, "创建失败")
            });
          }
        })
        .catch(error => {
          console.log(error); //请求失败返回的数据
        });
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    },
    filterYear(value, row) {
      return row.sch_year == value;
    },
    filterSemeter(value, row) {
      return row.semester == value;
    },
    handleTe(index, row) {
      this.idx = index;
      this.form = JSON.parse(JSON.stringify(row));
      this.course_id = this.form.id;
      //console.log(this.form);
      this.$axios
        .get("http://localhost:8082/info/getTeacherByCourse?course=" + row.id)
        .then(res => {
          //console.log(res);
          this.teachers = res.data.data.list;
          //console.log(this.options);
        });
      this.teVisible = true;
    },
    AddT() {
      const h = this.$createElement;
      //console.log(this.form);
      if (this.form.teacher_id == null) return;
      let item = {
        teacher_id: this.form.teacher_id,
        course: this.form.id
      };
      this.$axios
        .post("http://localhost:8082/info/newTe", this.qs.stringify(item))
        .then(res => {
          //console.log(res);
          if (res.data.code == 200) {
            //重新加载列表
            this.$axios
              .get(
                "http://localhost:8082/info/getTeacherByCourse?course=" +
                  this.course_id
              )
              .then(res => {
                //console.log(res);
                this.teachers = res.data.data.list;
              });
            this.$notify.success({
              title: "成功",
              message: h("i", { style: "color: teal" }, res.data.msg)
            });
            //location.reload();
          } else {
            this.$notify.error({
              title: "错误",
              message: h("i", { style: "color: teal" }, "创建失败")
            });
          }
        })
        .catch(error => {
          console.log(error); //请求失败返回的数据
        });
    },
    DeleteTe(index, row) {
      const h = this.$createElement;
      let id = row.id;
      //console.log(row.id);
      this.$axios
        .get("http://localhost:8082/info/deleteTe?id=" + id)
        .then(res => {
          if (res.data.code == 200) {
            //重新加载列表
            this.$axios
              .get("http://localhost:8082/info/getTeacherByCourse?course=" + id)
              .then(res => {
                //console.log(res.data.data.list);
                this.teachers = res.data.data.list;
              });
            this.$notify.success({
              title: "成功",
              message: h("i", { style: "color: teal" }, res.data.msg)
            });
            //location.reload();
          } else {
            this.$notify.error({
              title: "错误",
              message: h("i", { style: "color: teal" }, res.data.msg)
            });
          }
        });
    }
  }
};
</script>

<style scoped>
.handle-box {
  text-align: right;
  margin-bottom: 20px;
}

.handle-input {
  width: 30%;
  display: inline-block;
}

.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>