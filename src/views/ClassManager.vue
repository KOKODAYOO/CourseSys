<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-files"></i>班级信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-select v-model="query.depart_id" placeholder="请选择学院" class="handle-input mr10">
          <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-select
          v-model="query.s_id"
          @visible-change="showSpec($event,query.depart_id)"
          placeholder="请选择专业"
          class="handle-input mr10"
        >
          <el-option v-for="item in spec" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">搜索</el-button>
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
        <el-table-column prop="school_year" label="学年" sortable align="center"></el-table-column>
        <el-table-column prop="name" label="班级" sortable align="center"></el-table-column>
        <el-table-column prop="s_name" label="专业" sortable align="center"></el-table-column>
        <el-table-column prop="depart" label="学院" sortable align="center"></el-table-column>
        <el-table-column prop="teacher" label="班主任" sortable align="center"></el-table-column>
        <el-table-column label="选项" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
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
        <el-form-item label="班级名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属学院">
          <el-select v-model="form.depart_id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select
            v-model="form.s_id"
            @visible-change="showSpec($event,form.depart_id)"
            placeholder="请选择"
          >
            <el-option v-for="item in spec" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班主任">
          <el-select
            v-model="form.headteacher"
            @visible-change="showTeacher($event,form.depart_id,form.s_id)"
            placeholder="请选择"
          >
            <el-option
              v-for="item in teachers"
              :key="item.user_id"
              :label="item.name"
              :value="item.user_id"
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
        <el-form-item label="班级名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属学院">
          <el-select v-model="form.depart_id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业">
          <el-select
            v-model="form.s_id"
            @visible-change="showSpec($event,form.depart_id)"
            placeholder="请选择"
          >
            <el-option v-for="item in spec" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班主任">
          <el-select
            v-model="form.headteacher"
            @visible-change="showTeacher($event,form.depart_id,form.s_id)"
            placeholder="请选择"
          >
            <el-option
              v-for="item in teachers"
              :key="item.user_id"
              :label="item.name"
              :value="item.user_id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "class",
  data() {
    return {
      query: {
        s_id: "",
        depart_id: "",
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      delList: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1,
      options: [],
      spec: [],
      teachers: []
    };
  },
  mounted: function() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      var url = "http://localhost:8082/info/getAllClass";
      this.$axios.get(url).then(res => {
        //console.log(res);
        this.tableData = res.data.data.list;
        this.pageTotal = this.tableData.length || 10;
      });
      this.$axios.get("http://localhost:8082/info/getDepart").then(res => {
        //console.log(res);
        this.options = res.data.data.list;
        //console.log(this.options);
      });
    },
    // 触发搜索按钮
    handleSearch() {
      var url =
        "http://localhost:8082/info/searchClasses?s_id=" +
        this.query.s_id +
        "&depart_id=" +
        this.query.depart_id;
      //console.log(url);
      this.$axios.get(url).then(res => {
        //console.log(res);
        this.tableData = res.data.data.list;

        if (this.tableData != null) {
          this.pageTotal = this.tableData.length || 10;
        } else {
          this.pageTotal = 0;
        }
      });
    },
    // 删除操作
    handleDelete(index, row) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          const h = this.$createElement;
          var url = "http://localhost:8082/info/deleteClasses?id=" + row.id;
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
      this.form = JSON.parse(JSON.stringify(row));
      //console.log(this.form);
      this.$axios
        .get(
          "http://localhost:8082/user/getTeacherByDepart?depart_id=" +
            row.depart_id
        )
        .then(res => {
          //console.log(res);
          this.teachers = res.data.data.list;
          //console.log(this.options);
        });
      this.$axios
        .get("http://localhost:8082/info/getSpec?depart_id=" + row.depart_id)
        .then(res => {
          //console.log(res);
          this.spec = res.data.data.list;
          //console.log(this.options);
        });
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
        depart_id: this.form.depart_id,
        s_id: this.form.s_id,
        headteacher: this.form.headteacher
      };
      //console.log(item);
      this.$axios
        .post(
          "http://localhost:8082/info/modifyClasses",
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
      //console.log(this.form);
      const h = this.$createElement;
      this.$axios
        .post(
          "http://localhost:8082/info/newClasses",
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
    showSpec(callback, depart_id) {
      if (callback) {
        const h = this.$createElement;
        if (depart_id == null) {
          this.$notify.error({
            title: "错误",
            message: h("i", { style: "color: teal" }, "请选择学院")
          });
          return;
        }
        this.$axios
          .get("http://localhost:8082/info/getSpec?depart_id=" + depart_id)
          .then(res => {
            //console.log(res);
            this.spec = res.data.data.list;
            //console.log(this.options);
          });
      }
    },
    showTeacher(callback, depart_id, s_id) {
      if (callback) {
        const h = this.$createElement;
        if (depart_id == null || s_id === null) {
          this.$notify.error({
            title: "错误",
            message: h("i", { style: "color: teal" }, "请选择学院和专业")
          });
          return;
        }
        this.$axios
          .get(
            "http://localhost:8082/user/getTeacherByDepart?depart_id=" +
              depart_id
          )
          .then(res => {
            //console.log(res);
            this.teachers = res.data.data.list;
            //console.log(this.options);
          });
      }
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