<template>
  <el-container class="home_container">
    <home_nav></home_nav>
    <el-main>
      <div class="container">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="container_left">
              <el-menu
                class="el-menu-vertical-demo"            
                v-for="item in shoplist"
                :key="item.id"
                
              >                
                  <el-menu-item :index=item.id.toString() @click="skip($event)">                                       
                      <i :class= item.icon ></i>
                    <span>{{ item.name }}</span>
                  
                    
                  </el-menu-item>
                
              </el-menu>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="container_middle">
              <el-carousel trigger="click" height="400px">
                <el-carousel-item v-for="item in photolist" :key="item.id">
                  <img :src="item.idView" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <div class="clear"></div>
    <el-footer>
      <div class="top">
            <a href="/home">首页</a>
            <span>|</span>
            <a href="#">关于我们</a>
            <span>|</span>
            <a href="#">隐私声明</a>
            <span>|</span>
            <a href="#">法律声明</a>
            <span>|</span>
            <a href="#">会员规则</a>
        </div>
        <div class="bottom">
            <span>Copyright ©xxxxxx.com</span>
        </div>
    </el-footer>
  </el-container>
</template>
<script>
import home_nav from '../../components/nav'
export default {
  
 components:{
    home_nav,
 },
  data() {
    return {
      photolist: [
        { id: 1, idView: require("../../assets/3.jpg") },
        { id: 2, idView: require("../../assets/4.jpg") },
        { id: 3, idView: require("../../assets/3.jpg") },
        { id: 4, idView: require("../../assets/4.jpg") },
      ],
      shoplist: [
        {
          id: 1,
          name: "家居百货",
          icon: 'el-icon-scissors'
        },
        {
          id: 2,
          name: "家用电器",
         icon: 'el-icon-table-lamp'
        },
        {
          id: 3,
          name: "手机数码",
         icon: 'el-icon-mobile'
        },
        {
          id: 4,
          name: "汽车周边",
          icon: 'el-icon-truck'
        },
        {
          id: 5,
          name: "运动户外",
         icon: 'el-icon-basketball'
        },
        {
          id: 6,
          name: "箱包配饰",
         icon: 'el-icon-goods'
        },
        {

          id: 7,
          name: "食品保健",
         icon: 'el-icon-food'
        },
        {
          id: 8,
          name: "美妆个护",
         icon: 'el-icon-female'
        },
        {
          id: 9,
          name: "母婴用品",
         icon: 'el-icon-coin'
        },
      ],
    };
  },
  methods:{
    skip(e){
      const index = e.index
      this.$router.push({path:"/details/index="+index});
    }
  }
}
</script>
<style>
a {
  text-decoration: none;
}
header {
  color: #333;
}

/* main */
.home_container .el-main {
  height: 500px;
  display: flex;
  justify-content: center;
  background-color: #f4f3f3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.home_container .container {
  width: 85%;
}
.home_container .container_left {
  height: 400px;
  background-color: white;
}
.home_container .container_left li {
  height: 45px;
  line-height: 45px;
}
.home_container .container_left a{
  color: black;
}
.home_container .container_left i{
  padding-right: 10px;
}
.home_container .container_middle {
  height: 400px;
}
.home_container .container_middle img {
  width: 100%;
}
.home_container /el-menu-item {
  text-align: center;
}

/* footer */
.home_container .el-footer a{
    color:gray;
}
.home_container a:hover{
    color:orange;
}
.home_container .el-footer .top{
    margin-top: 20px;
    text-align: center;
}
.home_container .el-footer .top span{
    text-align: center;
    padding: 0 10px;
    color:gray;
}
.home_container .el-footer .bottom{
    text-align: center;
     color:gray;
     margin: 10px;
     margin-bottom: 20px;
}
</style>
