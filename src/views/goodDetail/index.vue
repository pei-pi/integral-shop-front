<template>
  <div>
    <home_nav></home_nav>
    <div class="body">
      <div class="container">
        <img :src="Base_Root + good.url" alt="" height="420px" width="420px" />
        <div class="detail">
          <span class="name">{{ good.name }}</span>
          <hr size="1" width="100%" color=" #c0c0c0" />
          <div class="integral">
            <span>价格：</span>
            <span class="number">{{ good.integral }}</span>
            <span>积分</span>
          </div>
          <div class="count">
            <span>数量：</span>
            <el-input-number
              v-model="num"
              :min="1"
              :max="this.good.count"
              label="描述文字"
            ></el-input-number>
          </div>
          <div class="remain_count">
            <span>剩余数量：</span>
            <span>{{ good.count }}</span>
          </div>
          <div class="address">
            <span>兑换地址：</span>
            <span>{{ good.address }}</span>
          </div>
          <el-button type="primary" @click="exchange()">立即兑换</el-button>
        </div>

        <div class="about">
          <span>--------相关商品--------</span>
          <span>暂无相关商品</span>
        </div>
      </div>
    </div>
    <home_footer></home_footer>
  </div>
</template>
<script>
import home_nav from "../../components/nav";
import home_footer from "../../components/footer";
export default {
  components: {
    home_nav,
    home_footer,
  },
  created() {
    this.getgood(), this.getUser();
  },
  data() {
    return {
      num: 1,
      good: "",
      Base_Root: "http://127.0.0.1:5000",
      token: sessionStorage.getItem("token"),
      user: {
        integral: "",
        id: "",
        email: "",
      },
    };
  },
  methods: {
    getgood() {
      const url = document.location.href;
      const reg = /[^=]+$/;
      const id = url.match(reg);
      this.$axios
        .get("/api/goods/getgood", {
          params: { id },
        })
        .then((res) => {
          console.log(res.data.data[0]);
          this.good = res.data.data[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //获取用户信息
    getUser() {
      this.$axios
        .get("/api/users/current", {
          headers: { Authorization: this.token },
        })
        .then((res) => {
          this.user.id = res.data.id;
          this.user.integral = res.data.integral;
          this.user.email = res.data.email;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    exchange() {
      if (this.user.integral > this.good.integral * this.num) {
        const name = this.good.name;
        const integral = this.user.integral - this.good.integral * this.num;
        const count = this.good.count - this.num;
        const address = this.good.address;
        const email = this.user.email;
        const _id = this.good._id;
        const num = this.num
        this.$axios
          .post("/api/goods/exchange", {
            integral,
            count,
            email,
            _id,
            address,
            name,
            num
          })
          .then((res) => {
            if (res.status == 200) {
              this.$message({
                message: "兑换成功",
                type: "success",
              });
              this.getgood();
              this.getUser();
            }
          });
      } else {
        this.$message.error("积分不足");
        return;
      }
    },
  },
};
</script>
<style scoped>
.body {
  width: 100%;
  background-color: #f4f3f3;
}
.container {
  width: 85%;
  margin: 0 auto;
  padding-top: 40px;
  display: flex;
  flex-direction: row;
  padding-bottom: 40px;
}
.container img {
  border: #c0c0c0 1px solid;
  width: 420px;
  height: 420px;
}
.container .detail {
  width: 480px;
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  font-size: 13px;
  padding-right: 20px;
}
.container .detail .name {
  font-size: 18px;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 10px;
  line-height: 1.5em;
}
.container .integral {
  margin-top: 20px;
  line-height: 27px;
}
.container .integral span {
  line-height: 27px;
}
.container .integral .number {
  font-size: 27px;
  font-weight: 600;
  color: rgb(255, 145, 0);
  text-align: center;
}
.container .count {
  margin-top: 15px;
}
.remain_count {
  margin-top: 20px;
}
.container .address {
  margin-top: 20px;
}
.el-button {
  width: 40%;
  margin-top: 60px;
}
.about {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  border-left: #c0c0c0 1px solid;
}
.about span {
  margin: 0 auto;
  line-height: 1.5em;
}
</style>