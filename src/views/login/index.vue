<template>
  <el-card shadow="always" class="card">
    <div slot="header" class="clearfix">
      <span class="text">登录</span>
      <router-link to="/register">注册</router-link>
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      var regEmail = /^[A-Za-z0-9\u4e00]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+$/;
      if (this.ruleForm.email != "" && !regEmail.test(this.ruleForm.email)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      ruleForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        password: [{ required: true ,message:"请输入密码" ,trigger:"blur"}],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/users/login", this.ruleForm)
            .then((res) => {
              this.$message({
                message: "登录成功",
                type: "success",
              });
              //console.log(res.data.token)
              sessionStorage.setItem("token", res.data.token);
              this.$router.push("/home");
            })
            .catch((err) => {
              if (err.response.status == 404) {
                this.$message.error("用户不存在");
              } else if (err.response.status == 400) {
                this.$message.error("密码错误！");
              }
            });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style scoped>
.clearfix{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.clearfix a{
  color: orange ;
}

.el-card {
  width: 40%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text {
  font-size: 24px;
}
.demo-ruleForm {
  padding-right: 50px;
  padding-top: 20px;
}
</style>