<template>
    <div>
        <h1>我的订单</h1>
    </div>
</template>
<script>
export default {
    data(){
        return{
            token:sessionStorage.getItem("token"),
            email:'',
        }
    },
    created(){
        this.getUser()
    },
    methods:{
        getUser(){
            this.$axios
            .get("/api/users/current", {
            headers: { Authorization: this.token },
            })
            .then((res) => {
                this.email = res.data.email
                this.getOrder()
            })
            .catch((err) => {
            console.log(err);
            });
        },
        async getOrder(){
            console.log(this.email)
            const email = this.email
            await this.$axios.get("/api/goods/getOrder",{
                params:{email}
            }).then((res)=>{
               if(res.status == 404){
                   
               }else{
                   console.log(res.data)
               }
            })
            
        }
    }
}
</script>