import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import SignIn from './views/SignIn.vue'
// import SignUp from './views/SignUp.vue'
import Restaurants from './views/Restaurants.vue'


Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active', //為當前選定的 router-link 增加 class，class 名稱自行定義
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/signin'
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn //component為單數，為 vue-router 的用法
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: () => import('./views/SignUp.vue')  //component為單數，為 vue-router 的用法
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants //component為單數，為 vue-router 的用法
    },
    {
      path: '/restaurants/feeds',
      name: 'restaurants-feeds',
      component: () => import('./views/RestaurantsFeeds.vue') //component為單數，為 vue-router 的用法
    },
    {
      path: '/restaurants/top',
      name: 'restaurants-top',
      component: () => import('./views/RestaurantsTop.vue') //component為單數，為 vue-router 的用法
    },
    {
      path: '/restaurants/:id/dashboard',
      name: 'restaurant-dashboard',
      component: () => import('./views/RestaurantDashboard.vue') //component為單數，為 vue-router 的用法
    },
    {
      path: '/restaurant/:id',
      name: 'restaurant',
      component: () => import('./views/Restaurant.vue') //component為單數，為 vue-router 的用法
    },
    {
      path: '/users/top',
      name: 'users-top',
      component: () => import('./views/UsersTop.vue') //component為單數，為 vue-router 的用法
    },
    {
      path: '/users/:id',
      name: 'users', //必須與路由的名稱一致，可以在 router-link 中使用此 name {router-link :to="{name:'users',params:{id:xxxx}}"}
      component: () => import('./views/User.vue') //component為單數，為 vue-router 的用法
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound //component為單數
    },
  ]
})
