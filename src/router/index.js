import Vue from 'vue'
import Router from 'vue-router'
import Register from '../views/register'
import Login from '../views/login'
import Home from '../views/home'
import User from '../views/user-center'
import Details from '../views/details'
import GoodDetail from '../views/goodDetail'
import manage from '../views/manage'
import userManage from '../components/manage/user-manage'
import goodsManage from '../components/manage/goods-manage'
import orderManage from '../components/manage/order-manage'
import userCenter from '../components/user-center/center'
import userOrder from '../components/user-center/order'
import userKeep from '../components/user-center/keep'
import userIntegral from '../components/user-center/integral'

Vue.use(Router)

 const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            redirect: "/manage"
        },
        {
            path:"/home",
            name:"home",
            component: Home
        },
        {
            path: "/register",
            name: "register",
            component: Register
        },
        {
            path: "/login",
            name: "login",
            component: Login
        },
        {
            path: "/user-center",
            name: "user-center",
            component: User,
            children:[
                {
                    path:'/user-center',
                    redirect:"/center"
                },
                {
                    path:"/center",
                    name:"center",
                    component:userCenter
                },
                {
                    path:"/integral",
                    name:"integral",
                    component:userIntegral
                },
                {
                    path:"/keep",
                    name:"keep",
                    component:userKeep
                },
                {
                    path:"/order",
                    name:"order",
                    component:userOrder
                },
            ]
        },
        {
            path: "/details/:index",
            name: "details",
            component: Details,
          
        },
        {
            path: "/goodDetail/:_id",
            name: "goodDetail",
            component: GoodDetail,
          
        },
        {
            path: "/manage",
            name: "manege",
            component: manage,   
            children:[
                {
                    path: "/user-manage",
                    name: "user-manege",
                    component: userManage,  
                },
                {
                    path: "/goods-manage",
                    name: "gooods-manege",
                    component: goodsManage,  
                },
                {
                    path: "/order-manage",
                    name: "order-manege",
                    component: orderManage,  
                }
            ]     
        },
    ]
})

//挂载路由导航守卫
router.beforeEach((to,from,next) => {
    if(to.path === '/login'||to.path === '/register') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr) return next('login')
    next()
})

export default router