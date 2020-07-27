import Vue from 'vue'
import { RawLocation } from 'vue-router'
import App from './App.vue'
import './plugins/axios.ts'
import './plugins/element.ts'
import router from './router'
import store from './store'
import utils from './utils/utils'

Vue.prototype.$utils = utils;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 修复路由重复点击报错问题
const push: Function = router.push;
router.push = function (location: RawLocation) {
  return push.call(this, location).catch(() => Error)
}
