import Vue from 'vue'
import Router from 'vue-router'
import Register from '../views/register'
import Login from '../views/login'
import Home from '../views/home'
Vue.use(Router)

 const router = new Router({
    routes: [
        {
            path: "/",
            redirect: "/login"
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
        }
    ]
})
export default router