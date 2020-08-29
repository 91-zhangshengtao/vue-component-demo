// import "amfe-flexible"; // rem(不手动方式)
import './utils/rem' // rem(手动方式)
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'



Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
