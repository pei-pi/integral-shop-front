<template>
  <div>
    <home_nav></home_nav>
    <div class="main">
      <div class="container">
        <el-row>
          <el-col :span="5">
            <el-menu
              active-text-color="#ffd04b"
              :default-active="this.$route.path"
              router
            >
              <el-menu-item v-for="(item,i) in list" :key="i" :index="item.name">
                <span slot="title">{{item.listname}}</span>
              </el-menu-item>
             
            </el-menu>
          </el-col>
          <el-col :span="18" class="rcol">
            <router-view></router-view>
          </el-col>
        </el-row>
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
  data() {
    return {     
      list:[
        {name:'/center',listname:'账户中心'},
        {name:'/order',listname:'我的订单'},
        {name:'/keep',listname:'我的收藏'},
        {name:'/integral',listname:'积分查询'},
      ]
    };
  },
};
</script>
<style scoped>
.main{
  background-color:  #f4f3f3;
}
.container {
  width: 85%;
  margin: 0 auto;
}
.el-row {
  padding-top: 20px;
}
.rcol{
  background-color: white;
  margin-left: 30px;
}
.el-menu{
  height: 400px;
  margin-bottom: 20px;
  text-align: center;
}

</style>
