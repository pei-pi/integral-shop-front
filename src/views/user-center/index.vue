<template>
  <div>
    <home_nav></home_nav>
    <div class="container">
      <div class="main">
        <el-row :gutter="20">
          <el-col :span="4"></el-col>
          <el-col :span="12"></el-col>
        </el-row>
      </div>
    </div>
    <home_footer></home_footer>
  </div>
</template>
<script>
import home_nav from '../../components/nav'
import home_footer from '../../components/footer'
export default {
  components:{
    home_nav,
    home_footer
  },
  data() {
    return {
      token: sessionStorage.getItem("token"),
      user: {
        username: "",
        email: "",
        integral: "",
      },
    };
  },
  created: function () {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$axios
        .get("/api/users/current", {
          headers: { Authorization: this.token },
        })
        .then((res) => {
          console.log(res.data);
          (this.user.username = res.data.name),
            (this.user.email = res.data.email),
            (this.user.integral = res.data.integral);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.container{
  width: 100%;
  background-color:  #f4f3f3;
  height: 100vh;
}
.main{
  width:85%;

}
</style>
