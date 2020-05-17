// const app = getApp()
var QQMapWX = require('../../static/qqmap/qqmap-wx-jssdk.js')
var qqmapsdk

Page({
  data: {
    province: '',
    city: '',
    latitude: '',
    longitude: ''
  },
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'XXXX-XXXX-XXXX-XXXX' // 这里自己的key秘钥进行填充
    })
  },
  onShow: function () {
    let vm = this
    vm.getUserLocation()
  }
})
