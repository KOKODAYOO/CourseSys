<template>
  <div class="content">
    <div class="user-info">
      <el-avatar class="logo" :size="160" :src="circleUrl"></el-avatar>
      <div class="lable">学生</div>
    </div>
    <el-card class="card">
      <van-row>
        <van-col class="title" span="6">个人资料</van-col>
      </van-row>
      <van-divider class="linear"></van-divider>

      <van-row class="info">
        <van-col span="12">学号: {{account}}</van-col>
        <van-col span="12">姓名: {{name}}</van-col>
      </van-row>
      <van-divider></van-divider>
      <van-row class="info">
        <van-col span="12">学院: {{department}}</van-col>
        <van-col span="12">专业: {{spec}}</van-col>
      </van-row>
      <van-divider></van-divider>
      <van-row class="info">
        <van-col span="12">入学时间: {{enrollment}}</van-col>
        <van-col span="12">班级: {{classname}}</van-col>
      </van-row>
      <van-divider></van-divider>
      <van-row class="info">
        <van-col span="12"></van-col>
      </van-row>
      <van-cell />
      <van-button size="large" type="danger" to="login">退出</van-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "MyInfo",
  mounted: function() {
    this.initData();
  },
  data() {
    return {
      status: false,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      account:"0000000000000",
      name:"student",
      department:"信息学院",
      spec:"计算机科学与技术",
      enrollment:"2017",
      classname:"1班"
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
      this.$axios.get(url).then(res => {
        //console.log(res);
        var data = res.data.data.list[0];
        this.account = data.account;
        this.name = data.name;
        this.enrollment = data.enrollment_time;
        this.classname = data.class;
        this.spec = data.s_name;
        this.department = data.depart;
      });
    }
  }
};
</script>
<style scoped>
.content {
  height: 740px;
  background-color: rgba(149, 155, 163, 0.068);
}

.user-info {
  height: 14em;
  margin-top: 0.25em;
  border-radius: 1em;
  background-color: rgb(255, 255, 255);
}
.logo {
  height: 10em;
  width: 10em;
  margin-top: 0.5em;
}

.lable {
  margin-top: 0.2em;
  font-size: xx-large;
}

.card {
  text-align: left;
  border-radius: 1em;
  margin-top: 0.25em;
  height: 500px;
  background-color: rgba(255, 255, 255, 0.993);
  /* background-color: rgba(221, 226, 236, 0.109); */
}

.title {
  font-size: larger;
  font-weight: bolder;
}

.info {
  margin-top: 3em;
  font-size: large;
}

.first_info {
  margin-left: 0.1em;
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

.linear_I {
  width: 2px;
  height: 400px;
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
</style>