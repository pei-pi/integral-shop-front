<template>
  <el-card class="box-card">
    <!-- 搜索与添加 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input
          placeholder="请输入用户名查询"
          v-model="queryInfo.query"
          clearable
          @clear="getUserList()"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchUser()"
          ></el-button>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="addDialogVisible = true"
          >添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户列表 -->
    <el-table :data="userList" border stripe>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="积分" prop="integral"></el-table-column>
      <el-table-column label="角色" prop="role"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="geteditUser(scope.row.email)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteUser(scope.row.email)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed()"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addForm"
        status-icon
        :rules="rules"
        ref="addForm"
        label-width="100px"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="addForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="integral">
          <el-input v-model="addForm.integral"></el-input>
        </el-form-item>
        <el-radio v-model="addForm.role" label="admin">管理员</el-radio>
        <el-radio v-model="addForm.role" label="guest">用户</el-radio>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="editDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editForm"
        status-icon
        :rules="rules"
        ref="editForm"
        label-width="100px"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="integral">
          <el-input v-model="editForm.integral"></el-input>
        </el-form-item>
        <el-radio v-model="editForm.role" label="admin">管理员</el-radio>
        <el-radio v-model="editForm.role" label="guest">用户</el-radio>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  created() {
    this.getUserList();
  },
  data() {
    var checkEmail = (rule, value, callback) => {
      var regEmail = /^[A-Za-z0-9\u4e00]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)+$/;
      if (this.addForm.email != "" && !regEmail.test(this.addForm.email)) {
        callback(new Error("邮箱格式不正确"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.addForm.checkPass !== "") {
          this.$refs.addForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      queryInfo: {
        query: "",
        //当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2,
      },
      total: 0,
      userList: [],
      addDialogVisible: false,
      editDialogVisible: false,

      addForm: {
        email: "",
        name: "",
        password: "",
        role: "guest",
        integral: "",
      },
      editForm: {
        email: "",
        name: "",
        role: "",
        integral: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        password: [
          { validator: validatePass, trigger: "blur" },
          {
            required: true,
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //获取用户列表
    async getUserList() {
      await this.$axios
        .get("api/manage/getUserList", {
          params: this.queryInfo,
        })
        .then((res) => {
          this.userList = res.data.list;
          this.total = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //搜索用户
    searchUser() {
      this.$axios
        .get("api/manage/searchUser", {
          params: this.queryInfo,
        })
        .then((res) => {
          this.userList = res.data.list;
          this.total = res.data.total;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            console.log(err);
          }
        });
    },
    // 添加用户
    addUser() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/users/register", this.addForm)
            .then((res) => {
              this.$message({
                message: "添加用户成功！",
                type: "success",
              });
              (this.addDialogVisible = false), this.getUserList();
            })
            .catch((err) => {
              if (err.response.status == 400) {
                this.$message.error("该邮箱已存在");
              }
            });
        }
      });
    },
    //监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addForm.resetFields();
    },

    //获取修改用户信息
    geteditUser(email) {
      this.editDialogVisible = true;
      this.$axios
        .get("api/manage/getCurrentUser", {
          params: { email: email },
        })
        .then((res) => {
          this.editForm = res.data.data;
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.$message.error("获取用户失败");
          }
        });
    },
    //修改用户信息
    editUser() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post("api/manage/editUser", this.editForm)
            .then((res) => {
              if (res.status == 202) {
                this.$message({
                  message: "请修改后再提交！",
                });
              } else {
                this.$message({
                  message: "用户信息修改成功！",
                  type: "success",
                });
                this.editDialogVisible = false;
                this.getUserList();
              }
            })
            .catch((err) => {
              if (err.response.status == 400) {
                this.$message.error("用户信息修改失败");
              }
            });
        }
      });
    },
    //删除用户
    deleteUser(email) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("api/manage/deleteUser", {
              params: {
                email: email,
              },
            })
            .then((res) => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });

                this.getUserList();
              }
            })
            .catch((err) => {
              if (res.status == 400) {
                this.$message.error("用户删除失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped>
.el-card {
  margin: 30px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}
.el-table {
  margin-top: 15px;
}
.el-pagination {
  margin-top: 15px;
}
.el-radio {
  padding-left: 70px;
}
</style>