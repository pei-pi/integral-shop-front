<template>
  <el-container class="manage_container">
    <el-header>
      <img src="../../assets/logo.png" alt="" height="70px" width="100px">
      <span>积分商城管理系统</span>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu   
      background-color="#333744"
      text-color="#fff"
      :default-active="this.$route.path"
      active-text-color="#ffd04b"
      router
      >    
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        <i :class=item.icon></i>
        <span slot="title">{{item.navName}}</span>
      </el-menu-item>
    </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data(){
    return{
      navList:[
        {name:'/home',navName:'首页',icon:'el-icon-menu'},
        {name:'/user-manage',navName:'用户管理',icon:'el-icon-user-solid'},
        {name:'/goods-manage',navName:'商品管理',icon:'el-icon-s-goods'},
        {name:'/order-manage',navName:'订单管理',icon:'el-icon-s-order'},
      ]
    }
  }
};
</script>
<style scoped>
.manage_container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  flex-direction: row;
}
.el-header img{
  margin-top: -5px;
}
.el-header span{
  font-size: 16px;
  color: white;
  padding-left: 20px;
  font-weight: 500;
  line-height: 60px;
}

/* 侧边栏 */
.el-aside {
  background-color: #333744;
}
.el-menu{
  border-right: none;
}

.el-main {
  background-color: #eaedf1;
}
</style>