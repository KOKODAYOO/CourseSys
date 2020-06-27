<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-files"></i>专业信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="专业" class="handle-input mr10"></el-input>
        <el-input v-model="query.depart" placeholder="学院" class="handle-input mr10"></el-input>
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
        <el-table-column prop="name" label="专业名称" sortable align="center"></el-table-column>
        <el-table-column prop="depart" label="所属学院" sortable align="center"></el-table-column>
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
        <el-form-item label="专业名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属学院">
          <el-select v-model="form.depart_id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
        <el-form-item label="专业名称">
          <el-input placeholder="请输入内容" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属学院">
          <el-select v-model="form.depart_id" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
  name: "spec",
  data() {
    return {
      query: {
        name: "",
        depart: "",
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
      options: []
    };
  },
  mounted: function() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      var url = "http://localhost:8082/info/getAllSpec";
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
      let name = this.query.name;
      let depart = this.query.depart;
      var url =
        "http://localhost:8082/info/getSpecBy?name=" +
        name +
        "&depart=" +
        depart;
      //console.log(url);
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
    // 删除操作
    handleDelete(index, row) {
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          const h = this.$createElement;
          var url = "http://localhost:8082/info/deleteSpec?id=" + row.id;
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
        depart_id: this.form.depart_id
      };
      this.$axios
        .post("http://localhost:8082/info/modifySpec", this.qs.stringify(item))
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
    // 添加操作
    handleAdd() {
      this.form = {};
      this.addVisible = true;
    },
    // 保存新建
    saveAdd() {
      this.addVisible = false;
      const h = this.$createElement;
      this.$axios
        .post(
          "http://localhost:8082/info/newSpec",
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