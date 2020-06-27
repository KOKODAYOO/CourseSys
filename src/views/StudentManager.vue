<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-s-custom"></i> 学生管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.account" placeholder="学号" class="handle-input mr10"></el-input>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" size="small" @click="handleSearch">搜索</el-button>
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click="handleAdd"
        >添加</el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        class="table"
        header-cell-class-name="table-header"
        :default-sort="{prop: 'id', order: 'ascending'}"
      >
        <el-table-column prop="id" label="ID" width="70px" sortable align="center"></el-table-column>
        <el-table-column prop="account" label="学号" sortable align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" sortable align="center"></el-table-column>
        <el-table-column prop="depart" label="学院" sortable align="center"></el-table-column>
        <el-table-column prop="s_name" label="专业" sortable align="center"></el-table-column>
        <el-table-column prop="classname" label="班级" sortable align="center"></el-table-column>
        <el-table-column prop="reg_date" label="注册时间" sortable align="center"></el-table-column>
        <el-table-column label="选项" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
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
        <el-form-item label="账号">
          <el-input v-model="form.account" readonly></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option v-for="item in genders" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="form.depart_id" placeholder="请选择">
            <el-option v-for="item in departs" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
        <el-form-item label="班级">
          <el-select
            v-model="form.class_id"
            @visible-change="showClass($event,form.s_id,form.depart_id)"
            placeholder="请选择"
          >
            <el-option v-for="item in classes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible=false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新建弹出框 -->
    <el-dialog title="新建" :visible.sync="addVisible" width="400px">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option v-for="item in genders" :key="item.id" :label="item.label" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院">
          <el-select v-model="form.depart_id" placeholder="请选择">
            <el-option v-for="item in departs" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
        <el-form-item label="班级">
          <el-select
            v-model="form.class_id"
            @visible-change="showClass($event,form.s_id,form.depart_id)"
            placeholder="请选择"
          >
            <el-option v-for="item in classes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
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
  name: "studentManager",
  data() {
    return {
      query: {
        name: "",
        account:"",
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
      genders: [
        {
          id: 0,
          label: "男"
        },
        {
          id: 1,
          label: "女"
        }
      ],
      departs: [],
      spec: [],
      classes: []
    };
  },
  mounted: function() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      var url = "http://localhost:8082/user/getStu";
      this.$axios.get(url).then(res => {
        //console.log(res);
        this.tableData = res.data.data.list;
        this.pageTotal = this.tableData.length || 10;
      });

      this.$axios.get("http://localhost:8082/info/getDepart").then(res => {
        //console.log(res);
        this.departs = res.data.data.list;
        //console.log(this.options);
      });
    },
    // 触发搜索按钮
    handleSearch() {
      let name = this.query.name;
      let account = this.query.account;
      //console.log(name,account);
      var url =
        "http://localhost:8082/user/getStuBy?name=" +
        name +
        "&account=" +
        account;
      this.$axios.get(url).then(res => {
        //console.log(name);
        this.tableData = res.data.data.list;

        if (this.tableData != null) {
          this.pageTotal = this.tableData.length || 10;
        } else {
          this.pageTotal = 0;
        }
      });
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = JSON.parse(JSON.stringify(row));
      //console.log(this.form);
      this.$axios
        .get("http://localhost:8082/info/getSpec?depart_id=" + row.depart_id)
        .then(res => {
          //console.log(res);
          this.spec = res.data.data.list;
          //console.log(this.options);
        });
        //
      this.$axios
        .get(
          "http://localhost:8082/info/getClass?depart_id=" +
            row.depart_id +
            "&s_id=" +
            row.s_id
        )
        .then(res => {
          //console.log(res);
          this.classes = res.data.data.list;
          //console.log(this.options);
        });
      this.editVisible = true;
    },
    // 添加操作
    handleAdd() {
      this.form = {};
      this.addVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      const h = this.$createElement;
      //console.log(this.form);
      var item = {
        id: this.form.id,
        name: this.form.name,
        password: this.form.password,
        gender: this.form.gender,
        s_id :this.form.s_id,
        depart_id:this.form.depart_id,
        class_id:this.form.class_id,
        user_id:this.form.id
      };
      this.$axios
        .post("http://localhost:8082/user/modifyStu", this.qs.stringify(item))
        .then(res => {
          console.log(res);
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
    // 保存新建
    saveAdd() {
      this.addVisible = false;
      const h = this.$createElement;
      this.$axios
        .post("http://localhost:8082/user/newStudent", this.qs.stringify(this.form))
        .then(res => {
          console.log(res);
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
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, "pageIndex", val);
      this.getData();
    },
    showClass(callback, s_id, depart_id) {
      if (callback) {
        //console.log(s_id,depart_id);
        const h = this.$createElement;
        if (s_id == null || depart_id == null) {
          this.$notify.error({
            title: "错误",
            message: h("i", { style: "color: teal" }, "请选择学院和专业")
          });
          return;
        }
        this.$axios
          .get(
            "http://localhost:8082/info/getClass?depart_id=" +
              depart_id +
              "&s_id=" +
              s_id
          )
          .then(res => {
            //console.log(res);
            this.classes = res.data.data.list;
            //console.log(this.options);
          });
      }
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
    }
  }
};
</script>

<style scoped>
.handle-box {
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