<template>
    <header class="home_nav">
      <div class="headerTop">
        <p>您好<span>{{username}}</span>,欢迎登陆积分商城</p>
        <div class="headerTopRight">
          <p @click="exit()">【退出登录】</p>
        </div>
      </div>
      <div class="headerBottom">
        <div class="headerBottom_top">
          <img src="../assets/logo.png" alt="LOGO" width="164px" height="140px">
          <el-input size="large" placeholder="请输入商品名称进行搜索">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <el-button slot="append" class="search_btn">搜索</el-button>
          </el-input>
        </div>
        <div class="headerBottom_bottom">
          <router-link to="/home">首页</router-link>
          <router-link to="#">我能兑换</router-link>
          <router-link to="#">排行榜</router-link>
          <router-link to="/user-center">我的账户</router-link>
          <router-link to="#" @click.native="manage()">管理中心</router-link>
            
        </div>
      </div>
    </header>
</template>
<script>
export default {
  data(){
      return{
        token:sessionStorage.getItem("token"),
        username:'',
        role:'',
      }
    },
    created(){
      this.getUser();
    },
  methods:{
    exit(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    getUser(){
      this.$axios
        .get("/api/users/current", {
          headers: { Authorization: this.token },
        })
        .then((res) => {
          this.username = res.data.name,
          this.role = res.data.role
        })
        .catch((err) => {
          console.log(err);
        });
    },
    manage(){
      if(this.role == "admin"){
        this.$router.push('/manage')
      }else{
        this.$message.error("抱歉，您暂无权限！")
      }
    }
    }
  }
</script>
<style scoped>
a {
  text-decoration: none;
}
header {
  color: #333;
}

/* header top */
.home_nav .headerTop {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 15px;
  background-color: #f4f3f3;
  justify-content: space-between;
}
.home_nav .headerTop > p {
  padding-left: 100px;
  font-size: 14px;
}
.home_nav .headerTop span{
  color: orange;
}
.home_nav .headerTopRight {
  display: flex;
  flex-direction: row;
  padding-right: 20px;
}
.home_nav .headerTopRight p {
  color: orange;
}
.home_nav .headerTopRight p:hover {
  cursor: pointer;
  text-decoration: underline;
}

/* header bottom */
.home_nav .headerBottom {
  height: 150px;
  display: flex;
  background: white;
  flex-direction: column;
}

/* header bottom top */
.home_nav .headerBottom_top {
  height: 100px;
  display: flex;
  flex-direction: row;
  line-height: 100px;
  margin-bottom: 20px;
}
.home_nav .headerBottom_top img{
  padding-left: 70px;
  padding-right: 12px;
}

.home_nav .headerBottom_top p {
  padding-left: 12px;
  font-size: 24px;
  font-family: "楷体";
  font-weight: 500;
}
.home_nav .el-input {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40%;

  border-radius: 10px;
}
.home_nav .el-input-group > .el-input__inner {
  border-color: orange !important;
}
.home_nav .search_btn {
  width: 100px;
}

/* header bottom bottom */
.home_nav .headerBottom_bottom {
  text-align: center;
}
.home_nav .headerBottom_bottom a {
  padding: 35px 50px 10px 50px;
  color: black;
  font-size: 14px;
  font-weight: 600;
}
.home_nav a.router-link-active {
  color: black;
}
.home_nav .headerBottom_bottom a:hover {
  /* text-decoration: underline; */
  border-bottom: 2px solid chocolate;
  color: chocolate;
}
</style>