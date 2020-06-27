<template>
  <div class="content">
    <div class="bg" :style="'background-image:url('+bgUrl+')'"></div>
    <h2>学生选课系统</h2>
    <div class="box">
      <form id="form1" method="get">
        <div class="inputBox">
          <img src="../assets/user.png" />
          <input type="text" name="account" v-model="account" placeholder="请输入学/工号" required />
          <label>学/工号</label>
        </div>
        <div class="inputBox">
          <img src="../assets/password.png" />
          <input type="password" name="password" v-model="password" placeholder="请输入密码" required />
          <label>密码</label>
        </div>
      </form>
    </div>
    <div class="function">
      <button class="input1" type="button" @click="login">登录</button>
    </div>
    <div class="forgetpass">
      <a href="#">
        <button class="input2" type="button">忘记密码？</button>
      </a>
      <span>|</span>
      <a href="#">
        <button class="input2" type="button">关于我们</button>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      bgUrl: require("../assets/bg2.jpg"),
      logoUrl: require("../assets/user.png"),
      account: "",
      password: ""
    };
  },
  methods: {
    login() {
      if (this.password == "" || this.account == "") {
        this.$message({
          type: "error",
          message: "请输入学号和密码"
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
        var data = res.data.data;
        // var name = data.userInfo.name;
        var id = data.userInfo.id;
        localStorage.setItem("id", id);

        const h = this.$createElement;
        if (res.data.code == 200) {
          var data = res.data.data;
          if (data.userInfo.user_level == 2) {
            this.$router.push("/MyClass");
          } else {
            this.$notify.error({
              title: "错误",
              message: h("i", { style: "color: teal" }, "权限错误")
            });
            return;
          }
          this.$notify.success({
            title: "你好呀！",
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


<style scoped>
.content {
  position: fixed;
  font-family: sans-serif;
  width: 100%;
  height: 100%;
  color: rgba(255, 255, 255, 0.39);
  background-color: rgba(243, 236, 236, 0.8);
}

.content .bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(5px);
  z-index: -1;
}

.content .box {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 260px;
  padding: 30px;
  background: #f5efef94;
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(194, 187, 187, 0.5);
  border-radius: 30px;
}
.content h2 {
  position: relative;
  margin-top: 140px;
  font-size: 36px;
  color: #fff;
  text-align: center;
}

.content .box .inputBox {
  position: relative;
}

.content .box .inputBox img {
  position: absolute;
  top: 24px;
  left: 0px;
  height: 40px;
  width: 40px;
}

.content .box .inputBox input {
  width: 80%;
  margin-top: 5%;
  padding: 10px 0;
  font-size: 24px;
  color: rgb(10, 10, 10);
  letter-spacing: 1px;
  margin-bottom: 30px;
  text-align: center;
  border: 1px solid #fff;
  border-radius: 10px;
  outline: none;
  background: #f1ededf1;
}
.content .box .inputBox label {
  position: absolute;
  top: -20px;
  left: 0;
  font-style: normal;
  padding: 10px 0;
  visibility: hidden;
  pointer-events: none;
  transition: 0.3s;
}

.content .box .inputBox input::placeholder {
  text-align: center;
}

.content .box .inputBox input:focus ~ label,
.content .box .inputBox input:valid ~ label {
  top: -20px;
  left: 0;
  font-style: normal;
  padding: 10px 0;
  visibility: visible;
  color: #000000;
  font-size: 24px;
}

.content .function {
  text-align: center;
}

.content .forgetpass {
  position: relative;
  margin-top: 5%;
}

.content .forgetpass .input2 {
  position: relative;
  background: transparent;
  border: none;
  font-size: 16px;
  outline: none;
  color: #fff;
  cursor: pointer;
}

.content .forgetpass span {
  position: relative;
  background: transparent;
  border: none;
  margin: 0 30px 30px;
  font-size: 16px;
  outline: none;
  color: #fff;
}

.content .function .input1 {
  position: relative;
  background: transparent;
  width: 300px;
  height: 60px;
  border: none;
  font-size: 24px;
  outline: none;
  color: #fff;
  background: #03a8f4b7;
  cursor: pointer;
  border-radius: 20px;
  margin-top: 360px;
}
</style>
