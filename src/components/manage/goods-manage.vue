<template>
  <el-card class="box-card">
    <!-- 搜索添加 -->
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入商品名称内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="addGoodVisible = true"
          >添加商品</el-button
        >
      </el-col>
    </el-row>
    <!-- 商品列表 -->
    <el-table :data="goodsList" border stripe>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="geteditGood(scope.row._id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteGood(scope.row._id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[2, 5, 10, 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加商品对话框 -->
    <el-dialog
      title="添加商品"
      :visible.sync="addGoodVisible"
      width="50%"
      @close="addGoodClosed()"
      :close-on-click-modal="false"
    >
      <el-form
        :model="addGoodForm"
        status-icon
        :rules="addGoodRules"
        ref="addGoodForm"
        label-width="100px"
      >
        <!-- 上传图片组件 -->
        <el-row :gutter="20" class="imgupload">
          <el-col :span="5">
            <span>请上传图片:</span>
          </el-col>
          <el-col :span="13">
            <imgUpload @func="getUrl"></imgUpload>
          </el-col>
        </el-row>
        <!-- 选择分类组件 -->
        <el-row :gutter="20" class="classify">
          <el-col :span="5">
            <span>请选择分类:</span>
          </el-col>
          <el-col :span="13">
            <el-cascader
              v-model="addGoodForm.value"
              :options="options"
            ></el-cascader>
          </el-col>
        </el-row>
        <!-- 商品信息 -->
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addGoodForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品积分" prop="integral">
          <el-input v-model="addGoodForm.integral"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="count">
          <el-input v-model="addGoodForm.count"></el-input>
        </el-form-item>
        <el-form-item label="兑换地址" prop="address">
          <el-input type="textarea" v-model="addGoodForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodVisible = false">取 消</el-button>
        <el-button type="primary" @click="addGood()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改商品信息对话框 -->
    <el-dialog
      title="修改商品信息"
      :visible.sync="editDialogVisible"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form
        :model="editGoodForm"
        status-icon
        :rules="addGoodRules"
        ref="editForm"
        label-width="100px"
      >
        <!-- 上传图片组件 -->
        <el-row :gutter="20" class="imgupload">
          <el-col :span="5">
            <span>请上传图片:</span>
          </el-col>
          <el-col :span="13">
            <imgUpload @func="getUrl"></imgUpload>
          </el-col>
        </el-row>
        <!-- 选择分类组件 -->
        <el-row :gutter="20" class="classify">
          <el-col :span="5">
            <span>请选择分类:</span>
          </el-col>
          <el-col :span="13">
            <el-cascader
              v-model="editGoodForm.value"
              :options="options"
            ></el-cascader>
          </el-col>
        </el-row>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="editGoodForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品积分" prop="integral">
          <el-input v-model="editGoodForm.integral"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="count">
          <el-input v-model="editGoodForm.count"></el-input>
        </el-form-item>
        <el-form-item label="兑换地址" prop="address">
          <el-input v-model="editGoodForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGood()">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>
<script>
import imgUpload from "../img-upload";
export default {
  components: {
    imgUpload,
  },
  created() {
    this.getGoodsList();
  },
  data() {
    return {
      queryInfo: {
        query: "",
        //当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
      total: 0,
      // 商品列表
      goodsList: [],
      //   添加商品表单
      addGoodForm: {
        name: "",
        integral: "",
        count: "",
        address: "",
        value: "",
        Url: "",
      },
      // 修改商品表单
      editGoodForm: {
        name: "",
        integral: "",
        count: "",
        address: "",
        value: "",
        url: "",
      },
      options: [
        {
          value: "1",
          label: "家居百货",
        },
        {
          value: "2",
          label: "家用电器",
        },
        {
          value: "3",
          label: "手机数码",
        },
        {
          value: "4",
          label: "汽车周边",
        },
        {
          value: "5",
          label: "运动户外",
        },
        {
          value: "6",
          label: "箱包配饰",
        },
        {
          value: "7",
          label: "食品保健",
        },
        {
          value: "8",
          label: "美妆个护",
        },
        {
          value: "9",
          label: "母婴用品",
        },
      ],
      addGoodVisible: false,
      addGoodRules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        integral: [
          { required: true, message: "请输入商品积分", trigger: "blur" },
        ],
        count: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
        address: [
          { required: true, message: "请输入商品兑换地址", trigger: "blur" },
        ],
      },
      editDialogVisible: false,
    };
  },
  methods: {
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      console.log(newSize);
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
    },
    //监听页码值改变的事件
    handleCurrentChange(newPage) {
      console.log(newPage);
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
    },
    //获取商品列表
    getGoodsList() {
      this.$axios
        .get("api/manage/getGoodsList", {
          params: this.queryInfo,
        })
        .then((res) => {
          this.goodsList = res.data.list;
          this.total = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取img-upload组件传过来的参数
    getUrl(data) {
      this.addGoodForm.Url = data;
    },
    //添加商品
    addGood() {
      this.$refs.addGoodForm.validate((valid) => {
        if (valid) {
          if (this.addGoodForm.Url == "") {
            this.$message.error("请先上传图片");
          } else if (this.addGoodForm.value == "") {
            this.$message.error("请选择分类");
          } else {
            this.$axios
              .post("api/manage/addGood", this.addGoodForm)
              .then((res) => {
                if (res.status == 200) {
                  this.$message({
                    message: "商品添加成功",
                    type: "success",
                  });

                  (this.addGoodVisible = false),
                    (this.addGoodForm.value = ""),
                    (this.addGoodForm.Url = "");
                  this.getGoodsList();
                }
              })
              .catch((err) => {
                this.$message.error("商品添加失败");
              });
          }
        }
      });
    },
    //监听添加商品对话框的关闭事件
    addGoodClosed() {
      this.$refs.addGoodForm.resetFields();
    },
    //获取修改商品信息
    geteditGood(_id) {
      console.log(_id);
      this.editDialogVisible = true;
      this.$axios
        .get("api/manage/getCurrentGood", {
          params: { _id: _id },
        })
        .then((res) => {
          this.editGoodForm = res.data.data;
          this.editGoodForm.value = res.data.data.index;
          console.log(res.data);
        })
        .catch((err) => {
          if (err.response.status == 400) {
            this.$message.error("获取商品失败");
          }
        });
    },
    //修改商品信息
    editGood() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post("/api/manage/editGood", this.editGoodForm)
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
                this.getGoodsList();
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
    //删除商品
    deleteGood(_id) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios
            .delete("api/manage/deleteGood", {
              params: {
                _id: _id,
              },
            })
            .then((res) => {
              if (res.status == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });

                this.getGoodsList();
              }
            })
            .catch((err) => {
              if (res.status == 400) {
                this.$message.error("商品删除失败");
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
.imgupload {
  text-align: center;
}
/* 分类级联选择器 */
.classify {
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>