<template>
    <div>
      <input type="file" name='image' id="imagelist">
      <img :src="root" :class={newclass:variable}>
      <button @click.prevent="upload()"> 上传</button>
    </div>
</template>
<script>
   export default {
    data() {
      return {
        Base_Root : "http://127.0.0.1:5000",
        root:'',
        variable:false,
        data:"",
      };
    },
    methods: {
      upload(){
      const file = document.getElementById("imagelist");
      const img = document.getElementsByTagName("img");
      console.log(file.files[0]);
      var formData = new FormData();
      formData.append("test",file.files[0]);
        this.$axios
            .post("/api/upload/img", formData)
            .then((res) => {
              console.log(res.data);
               this.root = this.Base_Root+res.data.data
               this.variable = true,
               this.data = res.data.data
              this.$emit('func',this.data)
            })
            .catch((err) => {
              console.log("fail");
              this.$message.error("请导入照片")
            });
    }  ,
  }
   }
</script>
<style scoped>
 .newclass{
   height:100px;
   width:100px;
 }
</style>