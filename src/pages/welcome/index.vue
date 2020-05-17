<template>
  <div style="width: 100%;text-align: center">
    <div>
      <img src="../../../static/images/app_wenzi.png" style="width: 30%;padding-top: 50px" mode="widthFix" >
    </div>
    <div>
      <img src="../../../static/images/app_tupian.png" style="width: 60%;padding-top: 20px" mode="widthFix">
    </div>
    <div>
      <img src="../../../static/images/app_tubiaos.png" style="width: 35%;padding-top: 20px" mode="widthFix">
    </div>
    <div>
      <img src="../../../static/images/app_weizis.png" style="width: 30%;padding-top: 20px" mode="widthFix">
    </div>
  </div>
</template>

<script>
var QQMapWX = require('../../../static/qqmap/qqmap-wx-jssdk.js')
var qqmapsdk
export default {
  components: {
  },

  data () {
    return {
      province: {},
      city: '',
      address: '',
      screenWidth: 0,
      imgwidth1: 0,
      imgheight1: 0
    }
  },
  created () {
  },
  onLoad: function () {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'EPDBZ-L47LW-YNJRE-OHP7M-CHYDO-7CBGD'
    })
    this.getUserLocation()
    // var that = this
    // wx.getSystemInfo({
    //   success: function (res) {
    //     that.setData({
    //       screenWidth: res.windowWidth
    //     })
    //   }
    // })
  },
  mounted () {
  },
  methods: {
    // GOTO 跳转页面
    goToTestPage () {
      mpvue.reLaunch({url: '/pages/supermarket/main'})
    },
    getUserLocation () {
      let vm = this
      wx.getSetting({
        success: (res) => {
          console.log(res.authSetting['scope.userLocation'])
          // console.log(JSON.stringify(res))
          // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
          // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
          // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
          if (res.authSetting['scope.userLocation'] !== undefined && res.authSetting['scope.userLocation'] !== true) {
            wx.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success: function (res) {
                if (res.cancel) {
                  vm.goToTestPage()
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function (dataAu) {
                      if (dataAu.authSetting['scope.userLocation'] === true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        // 再次授权，调用wx.getLocation的API
                        vm.getLocation()
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                        mpvue.reLaunch({url: '/pages/supermarket/main'})
                      }
                    }
                  })
                }
              }
            })
          } else if (res.authSetting['scope.userLocation'] === undefined) {
            // 调用wx.getLocation的API
            vm.getLocation()
          } else {
            // 调用wx.getLocation的API
            vm.getLocation()
          }
        }
      })
    },
    // 微信获得经纬度
    getLocation () {
      var that = this
      wx.getLocation({
        type: 'gcj02',
        success: function (res) {
          // console.log(JSON.stringify(res))
          var latitude = res.latitude
          var longitude = res.longitude
          // var speed = res.speed
          // var accuracy = res.accuracy
          that.getLocal(latitude, longitude)
        },
        fail: function (res) {
          that.goToTestPage()
          // console.log('fail' + JSON.stringify(res))
        }
      })
    },
    // 获取当前地理位置
    getLocal (latitude, longitude) {
      let that = this
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: function (res) {
          that.province = JSON.stringify(res.result.ad_info)
          that.city = res.result.ad_info.city
          that.address = res.result.address
          // 判断是否等于襄阳跳转
          if (that.city === '襄阳市') {
            // that.goToTestPage()
            that.globalData.location = res.result.location
            mpvue.reLaunch({url: '/pages/index/main'})
          } else {
            that.goToTestPage()
          }
        },
        fail: function (res) {
          console.log(res)
        },
        complete: function (res) {
          // console.log(res);
        }
      })
    },
    imageload1 () {
      console.log(222222)
      // this.$refs.one.style.height = '1000px'
    }
  }
}
</script>

<style>

</style>
