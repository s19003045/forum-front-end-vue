import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from "moment";
import store from './store'

Vue.config.productionTip = false

// 全域註冊 filter
// Vue.filter('fromNow', function (value) {
//   if (!value) {
//     return "-";
//   }
//   // 使用 moment 提供的 fromNow 方法
//   return moment(value).fromNow();
// })

// 建立 Vue instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

