import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import axios from './utils/request'
import commonFilter from '@/utils/filters'
import plugins from '@/plugins'
import MetaInfo from 'vue-meta-info'

Vue.use(MetaInfo)

Vue.config.productionTip = false

console.log(`%c 当前环境 - ${process.env.NODE_ENV} `, 'background:#fff9a7;color:#77a8d8;font-size:22px;')

// 全局过滤器
Object.keys(commonFilter).forEach(key => {
  Vue.filter(key, commonFilter[key])
})

// 注册插件/全局组件
Vue.use(plugins)

// 注册axios请求
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
