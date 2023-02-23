import Vue from "vue";
import VueRouter from "vue-router";

//安装插件
Vue.use(VueRouter)

const Home  = () => import('../views/home/Home')
const Cart = () => import('../views/cart/Cart')
const Category = () => import('../views/category/Category')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')


//配置对应的映射关系
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

//创建router
const router  = new VueRouter({
  routes,
  mode: 'history'
})

//导出
export default router
