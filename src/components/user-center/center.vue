<template>
  <div class="rows">
    <div class="rows1">
      <img src="../../assets/head.png" width="80px" height="80px" />
      <div class="columns">
        <span class="name">{{ user.username }}</span>
        <span class="email">邮箱：{{ user.email }}</span>
      </div>
    </div>
    <div class="rows2">
      <img src="../../assets/integral.png" width="80px" height="80px" />
      <div class="integral">
        <span>当前可用积分</span>
        <span>{{ user.integral }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: sessionStorage.getItem("token"),
      user: {
        username: "",
        email: "",
        integral: "",
      },
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios
        .get("/api/users/current", {
          headers: { Authorization: this.token },
        })
        .then((res) => {
          this.user.username = res.data.name;
          this.user.email = res.data.email;
          this.user.integral = res.data.integral;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.rows {
  display: flex;
  flex-direction: row;
  padding: 20px;
}
.rows1 {
  display: flex;
  flex-direction: row;
}
.rows2 {
  display: flex;
  flex-direction: row;
  padding-left: 60px;
}
.columns {
  display: flex;
  flex-direction: column;
  padding-left: 20px;
}
.name {
  padding-top: 8px;
  font-size: 28px;
}
.email {
  font-size: 20px;
  padding-top: 12px;
}
.integral {
  padding-left: 10px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
}
.integral span:first-child {
  font-size: 18px;
}
.integral span:last-child {
  color: orange;
  font-size: 24px;
  padding-top: 12px;
}
</style>