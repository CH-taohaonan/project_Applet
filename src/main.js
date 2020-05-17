import Vue from 'vue'
import App from './App'
import httputils from './utils/httputils.js'
import UrlConstant from './constant/UrlConstant.js'
import Decimal from 'decimal.js'
import animate from 'animate.css'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.httputils = httputils
Vue.prototype.UrlConstant = UrlConstant
Vue.prototype.Decimal = Decimal
Vue.use(animate)

const app = new Vue(App)
app.$mount()

Vue.prototype.globalData = getApp().globalData
