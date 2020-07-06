import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import InfoShow from '../views/InfoShow.vue'
import ProductList from '../views/ProductList.vue'
import Productinfo from '../views/ProductInfo.vue'
import Index from '../views/Index.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import NotFond from '../views/NotFound.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',

    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children:[
        {
          path: '/',
          redirect:'/home',
    
        },
        {
          path: '/home',
          name: 'home',
          component: Home 
        },
        {
          path: '/infoShow',
          name: 'infoShow',
          component: InfoShow
        },
        {
          path: '/productList',
          name: 'productList',
          component: ProductList
        },
        {
          path: '/productinfo/:id',
          name: 'productinfo',
          component: Productinfo
        },
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: 'notFond',
      component: NotFond
    },

  ]
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.webpackTOKEN ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;