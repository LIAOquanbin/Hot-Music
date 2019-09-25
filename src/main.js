import Vue from 'vue'
import App from './App.vue'
import router from '../src/router'
import store from './store'
import Mint from 'mint-ui'
import axios from 'axios'
import {Swipe,SwipeItem ,Popup  } from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueJsonp from 'vue-jsonp'
import VueLazyLoad from 'vue-lazyload'
Vue.prototype.axios = axios;
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Popup.name, Popup)
Vue.use(Mint,VueJsonp)
Vue.use(VueLazyLoad,{
  loading:'@/assets/logo.png'
})
Vue.config.productionTip = false
import Loading from '@/components/Loading'
Vue.component('Loading',Loading)
axios.defaults.baseURL = 'http://localhost:3000/'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
