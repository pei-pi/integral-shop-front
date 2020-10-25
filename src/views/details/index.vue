<template>
  <div class="details_container">
    <home_nav></home_nav>
    <el-container>
      <div class="shop_list">
        <div class="shop_list_name">{{list}}</div>
        <div class="shop_list_screen">
          <span>商品筛选</span>
            <span>共</span>
            <span class="count">{{count}}</span>
            <span>个商品</span>
        </div>
        <div class="shop_list_integral_range">
          <span>积分范围</span>
          <div class="shop_list_integral">
            <p>不限</p>
            <p>0-1000分</p>
            <p>1001-2000分</p>
            <p>2001-3000分</p>
            <p>3001-5000分</p>
            <p>5001-10000分</p>
            <p>大于10001分</p>
          </div>
        </div>
      </div>
      <div class="goods">
        <div class="goods_item" v-for="(item,index) in goodsList" ref="reflist" :key="index" @click="goodDetail(item)">
          <img :src="Base_Root+item.url" alt="" />
          <div class="goods_item_introduce">
            <div class="goods_score">
              <h3>{{item.integral}}</h3>
              <span>积分</span>
            </div>
            <span class="itemname">{{item.name}}</span>
          </div>
        </div>
      </div>

    </el-container>
    <home_footer></home_footer>
  </div>
</template>
<script>
import home_nav from "../../components/nav";
import home_footer from "../../components/footer"
export default {
  created() {
    this.getGoods();
  },
  data() {
    return {
      Base_Root : "http://127.0.0.1:5000",
      root:'',
      list: "",
      goodsList:[],
      count:0,
    };
  },
  components: {
    home_nav,
    home_footer
  },
  methods: {
    getGoods() {
      const url = document.location.href;
      const index = url.charAt(url.length - 1);
      if (index == 1) {
        this.list = "家用百货";
      } else if (index == 2) {
        this.list = "家用电器";
      } else if (index == 3) {
        this.list = "手机数码";
      } else if (index == 4) {
        this.list = "汽车周边";
      } else if (index == 5) {
        this.list = "运动户外";
      } else if (index == 6) {
        this.list = "箱包配饰";
      } else if (index == 7) {
        this.list = "食品保健";
      } else if (index == 8) {
        this.list = "美妆个护";
      } else if (index == 9) {
        this.list = "母婴用品";
      }
      this.$axios
        .post("/api/goods/showgoods", index)
        .then((res) => {
          if(res.status == 404){
          this.$message.error("没有商品")
        }else{
         
          this.goodsList = res.data.data
          this.count = res.data.data.length
        }
        });
    },
    goodDetail(item){
     console.log(item)
     this.$router.push({path:"/goodDetail/_id="+item._id})

    }
  },
};
</script>
<style >
body {
  height: 500px;
  width: 100%;
  background-color: white;
}
.details_container .el-container {
  width: 90%;
  background-color: white;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.details_container .shop_list {
  display: flex;
  flex-direction: column;
  border: #c0c0c0 1px dashed;
  font-size: 14px;
  color: #575757;
}
.details_container .shop_list_name {
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  background-color: #f4f3f3;
  padding-left: 10px;
  border-bottom: #e2e2e2 1px dashed;
}
.details_container .shop_list_screen {
  height: 45px;
  line-height: 45px;
  display: flex;
  flex-direction: row;
  padding-left: 10px;
  border-bottom: #c0c0c0 1px dotted;
}
.details_container .shop_list_screen .count{
  padding: 0 4px;
  color:  rgb(255, 153, 0);
}
.details_container .shop_list_screen span:first-child {
  font-weight: 600;
  padding-right: 25px;
}
.details_container .shop_list_integral_range {
  display: flex;
  flex-direction: row;
  height: 45px;
  line-height: 45px;
  padding-left: 10px;
}
.details_container .shop_list_integral_range span {
  font-weight: 600;
  padding-right: 25px;
}
.details_container .shop_list_integral {
  display: flex;
  flex-direction: row;
}
.details_container .shop_list_integral p {
  padding-right: 10px;
}

/* goods */
.details_container .goods_item {
  width: 18%;
  height: 310px;
  float: left;
  text-align: center;
  margin-top: 20px;
  box-sizing: border-box;
  border: #c0c0c0 1px solid;
}
.details_container .goods_item:hover{
  cursor: pointer;
  border: orange 1px solid;
}
.details_container .goods_score{
  display: flex;
  flex-direction: row;
  font-size: 14px;
  color:rgb(204, 0, 0);
}
.details_container .goods_item_introduce .itemname{
  font-size: 13px;
  font-weight: 400;
  margin-top: 10px;
  line-height: 1.5em;
}
.details_container .goods_item_introduce .itemname:hover{
  color: rgb(255, 153, 0);
  text-decoration: underline;
}
.details_container .goods_score h3{
  font-weight: 600;
  padding-right: 5px;
}
.details_container .goods_item:not(:nth-child(5n)) {
  margin-right: 2.5%;
}
.details_container .goods_item:nth-child(5n) {
  margin-right: 0px;
}
.details_container .goods_item img {
  width: 100%;
  height: auto;
}
.details_container .goods_item_introduce {
  display: flex;
  text-align: left;
  flex-direction: column;
  margin: 8px;
}
</style>