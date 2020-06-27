<template>
  <div class="content">
    <div class="bg" :style="'background-image:url('+bgUrl+')'"></div>
    <div class="box">
      <h2>选修课程管理系统</h2>
      <form id="form1" method="get">
        <div class="inputBox">
          <input type="text" name="account" v-model="account" required />
          <label>账号</label>
        </div>
        <div class="inputBox">
          <input type="password" name="password" v-model="password" required />
          <label>密码</label>
        </div>
        <button class="input1" type="button" @click="login" @keydown.enter="login">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      bgUrl: require("../assets/bg.jpg"),
      account: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.password == "" || this.account == "") {
        this.$message({
          type: "error",
          message: "请输入账号和密码"
        });
        return;
      }
      var url =
        "http://localhost:8082/user/login?account=" +
        this.account +
        "&password=" +
        this.password;
      this.$axios.get(url).then(res => {
        //console.log(res.data);
        const h = this.$createElement;
        if (res.data.code == 200) {
          var data = res.data.data;
          var id = data.userInfo.id;
          var name = data.userInfo.name;
          var level = data.userInfo.user_level;
          // // console.log(name,level);
          // this.$store.commit("setname", name);
          // this.$store.commit("setlevel", level);
          localStorage.setItem("id", id);
          localStorage.setItem("name", name);
          localStorage.setItem("level", level);

          if (data.userInfo.user_level == 0) {
            this.$router.push("/adminList");
          } else if (data.userInfo.user_level == 1) {
            this.$router.push("/TCManager");
          } else {
            this.$notify.error({
              title: "错误",
              message: h("i", { style: "color: teal" }, "权限不足")
            });
            return;
          }
          this.$notify.success({
            title: "登录成功",
            message: h("i", { style: "color: teal" }, res.data.msg)
          });
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  position: fixed;
  top: 50%;
  left: 50%;
  font-family: sans-serif;
  transform: translate(-50%, -50%);
  min-width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.39);
  background-color: rgba(0, 0, 0, 0.8);
}

.content .bg {
  position: absolute;
  transform: translate(10%, 5%);
  width: 80%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(20px);
  z-index: -1;
}

.content .box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 400px;
  padding: 40px;
  background: #0a08088f;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  border-radius: 30px;
}
.content .box h2 {
  margin: 0 0 30px;
  padding: 0;
  font-size: 36px;
  color: #fff;
  text-align: center;
}

.content .box .inputBox {
  position: relative;
}

.content .box .inputBox input {
  width: 100%;
  margin-top: 5%;
  padding: 10px 0;
  font-size: 24px;
  color: #fff;
  letter-spacing: 1px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}
.content .box .inputBox label {
  position: absolute;
  font-style: italic;
  top: 0;
  left: 0;
  padding: 30px 0;
  font-size: 24px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.content .box .inputBox input:focus ~ label,
.content .box .inputBox input:valid ~ label {
  top: -18px;
  left: 0;
  font-style: normal;
  padding: 10px 0;
  color: #03a9f4;
  font-size: 24px;
}

.content .box .input1 {
  background: transparent;
  border: none;
  outline: none;
  color: #fff;
  background: #03a9f4;
  padding: 10px 40px;
  cursor: pointer;
  font-size: 24px;
  border-radius: 5px;
}
</style>
