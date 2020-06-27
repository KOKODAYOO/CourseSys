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
        <el-button v-if="status==0" type="success" icon="el-icon-receiving" size="small" @click="handleEdit">开始选课</el-button>
        <el-button v-if="status==1" type="danger" icon="el-icon-receiving" size="small" @click="handleEdit">结束选课</el-button>
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
        <el-table-column prop="teacher" label="老师" sortable align="center"></el-table-column>
        <el-table-column prop="total_number" label="人数" sortable align="center"></el-table-column>
        <el-table-column label="状态" sortable align="center">
          <template
            slot-scope="scope"
          >{{ scope.row.status==0?'未开始':(scope.row.status==1?'进行':'结束')}}</template>
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

    <!--
    <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="专业名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属学院">
          <el-input v-model="form.apartment"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  name: "course",
  data() {
    return {
      query: {
        s_id: "",
        depart_id: "",
        pageIndex: 1,
        pageSize: 10
      },
      status: 0,
      tableData: [],
      delList: [],
      editVisible: false,
      addVisible: false,
      pageTotal: 0,
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
      options: [],
      spec: []
    };
  },
  mounted: function() {
    this.getData();
  },
  methods: {
    // 获取数据
    getData() {
      var url = "http://localhost:8082/info/getCourse";
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
      this.$axios.get("http://localhost:8082/info/getStatus").then(res => {
        //console.log(res);
        this.status = res.data.data.status.course_status;
        //console.log(this.status);
      });
    },
    // 触发搜索按钮
    handleSearch() {
      var url =
        "http://localhost:8082/info/getCourse?s_id=" +
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
    // 编辑操作
    handleEdit() {
      const h = this.$createElement;
      this.$axios
        .get("http://localhost:8082/info/changeStatus?status="+this.status)
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
    // handleEdit(index, row) {
    //   this.idx = index;
    //   this.form = row;
    //   this.editVisible = true;
    // },
    // 保存编辑
    saveEdit() {
      // this.editVisible = false;
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