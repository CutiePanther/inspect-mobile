import Vue from 'vue'
import App from './App'
import httpInterceptor from '@/common/http.interceptor.js'
import httpApi from '@/common/http.api.js'
import uView from 'uview-ui'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(uView)

const app = new Vue({
    ...App
})

Vue.use(httpInterceptor, app)

Vue.use(httpApi, app)

app.$mount()
