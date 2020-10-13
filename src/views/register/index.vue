<template>
  <el-card shadow="always" class="card">
    <div slot="header" class="clearfix">
      <span class="text">注册</span>
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
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input
          type="password"
          v-model="ruleForm.checkPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >注册</el-button
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
      }else{
        callback()
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        email: "",
        name: "",
        password: "",
        checkPass: "",
      },
      rules: {
        email: [
          { required:true,message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            required: true,min: 6,max: 12, message: "长度在 6 到 12 个字符",trigger: "blur",
          },
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
       this.$refs[formName].validate((valid) => {
       if (valid) {
      this.$axios.post("/api/users/register", this.ruleForm)
      .then((res) => {
        this.$message({
          message:'注册成功！',
          type:'success'
        })
        this.$router.push('/login')
      })
       .catch(err=>{
        if(err.response.status == 400){
          this.$message.error('该邮箱已被注册')
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