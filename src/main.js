// import "amfe-flexible"; // rem(不手动方式)
import './utils/rem' // rem(手动方式)
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'


// moment
import moment from 'moment'
import 'moment/locale/zh-cn' // 手动引入中文包
moment.locale('zh-cn') // 设置语言为中文
console.log('locale:',moment.locale()) // zh-cn
console.log('date:',moment().format('LL')) // 2020年8月17日


Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
