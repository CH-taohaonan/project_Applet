<template>
  <div >
    <div style="text-align: center">
      <div style="text-align: center;padding-top: 20%">
        <div>
          <img src="../../../static/images/app_logio.png" style="width: 80px;height: 80px">
        </div>
        <div style="padding-top: 10px">
          优食襄
        </div>
      </div>
    </div>
    <div style="text-align: center;padding-top: 20%">
      <button style="width: 80%" open-type="getPhoneNumber" @getphonenumber="getphonenumber">微信登录</button>

    </div>
    <div style="font-size: 14px;position: absolute;left: 0;bottom: 10px;right: 0;">
      <div style="text-align: center">
        登录代表您已同意<span @click="dianji" style="color: #C78324">优食襄用户协议，隐私协议</span>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      utoken: ''
    }
  },

  created () {
  },
  onLoad (options) {
    var that = this
    var code = options.code
    wx.getUserInfo({
      success (res) {
        console.log(res)
        var encryptedData = res.encryptedData
        var iv = res.iv
        var url = that.UrlConstant.HOST_NAME + 'wechatlogin/'
        var data = {
          'code': code,
          'encryptedData': encryptedData,
          'iv': iv
        }
        that.httputils.post(url, data, function (resp) {
          that.utoken = resp.data.utoken
        })
      }
    })
  },
  methods: {
    getphonenumber (e) {
      var encryptedData = e.mp.detail.encryptedData
      var iv = e.mp.detail.iv
      var url = this.UrlConstant.HOST_NAME + 'bindphone/'
      var data = {
        'utoken': this.utoken,
        'encryptedData': encryptedData,
        'iv': iv
      }
      var that = this
      this.httputils.post(url, data, function (resp) {
        console.log(123456, resp)
        wx.setStorage({
          key: that.UrlConstant.USER_INFO,
          data: resp.data
        })
        that.globalData.user = resp.data
        console.log(9999, that.globalData.user)
        that.globalData.isLogin = true
        console.log(123456, that.globalData)
        wx.navigateBack({
          delta: -1
        })
      })
    },
    dianji () {
      mpvue.navigateTo({url: '/pages/webview/main'})
    }
  }
}
</script>

<style>

</style>
