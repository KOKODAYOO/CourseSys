<template>
  <div>
    <el-card class="card">
      <van-cell />
      <van-field
        readonly
        clickable
        name="picker"
        :value="studentYear"
        label="学年"
        placeholder="点击选择学年"
        @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          show-toolbar
          :columns="years"
          @confirm="onConfirm1"
          @cancel="showPicker1 = false"
        />
      </van-popup>

      <van-cell />

      <van-field
        readonly
        clickable
        name="picker"
        :value="semester"
        label="学期"
        placeholder="点击选择学期"
        @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
          show-toolbar
          :columns="semesters"
          @confirm="onConfirm2"
          @cancel="showPicker2 = false"
        />
      </van-popup>

      <van-cell />
      <van-button
        size="large"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
        @click="getGrades"
      >查看成绩</van-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Mygrades",
  data() {
    return {
      status: true,
      studentYear: "",
      semester: "",
      years: ["2017", "2018", "2019", "2020"],
      semesters: ["1", "2"],
      showPicker1: false,
      showPicker2: false
    };
  },
  methods: {
    onConfirm1(studentYear) {
      this.studentYear = studentYear;
      this.showPicker1 = false;
    },
    onConfirm2(semester) {
      this.semester = semester;
      this.showPicker2 = false;
    },
    getGrades() {
      localStorage.setItem("semester", this.semester);
      localStorage.setItem("sch_year", this.studentYear);
      this.$router.push("/grades");
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

.van-field {
  font-size: x-large;
}
.van-button {
  margin-top: 5em;
}
</style>