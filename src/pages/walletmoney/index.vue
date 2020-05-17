<template>
  <div >
    <div style="padding-left: 20px;font-size: 20px;">充值金额</div>
    <div style="padding: 20px;">
        <van-field
          label="¥"
          :value="rechargeAmount"
          type="number"
          title-width="15px"
          custom-style="border: 0;padding: 0;height 30px"
          @change="onChange"
        />
    </div>
    <div style="font-size: 12px;color: #A8A8A8;padding-left: 20px;padding-bottom: 50px">本次充值最少¥50&nbsp;&nbsp;&nbsp;充值后可享受VIP价格</div>
    <div>
      <button style="margin: 20px;background-color: #F5BE48;color: white" @click="rechargeWallet">去充值</button>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      rechargeAmount: ''
    }
  },
  methods: {
    onChange (event) {
      // event.detail 为当前输入的值
      console.log(event.mp.detail)
      this.rechargeAmount = event.mp.detail
    },
    rechargeWallet () {
      if (this.rechargewallet === '') {
        this.httputils.showToast('充值金额不能为空')
      }
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'rechargewallet/'
      var data = {
        'utoken': this.globalData.user.utoken,
        'rechargeAmount': this.rechargeAmount
      }
      console.log(data)
      this.httputils.post(url, data, function (resp) {
        console.log(resp)
        var paymentData = resp.data
        wx.requestPayment(
          {
            'timeStamp': paymentData.timeStamp,
            'nonceStr': paymentData.nonceStr,
            'package': paymentData.packagevalue,
            'signType': 'MD5',
            'paySign': paymentData.sign,
            'success': function (res) {
              that.httputils.showToast('支付成功')
              that.syncuserInfo()
              wx.navigateBack({
                delta: -1
              })
            },
            'fail': function (res) {
              console.log(res)
              that.httputils.showToast('支付失败')
            },
            'complete': function (res) {

            }
          })
      })
    },
    syncuserInfo () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'syncuserinfo/'
      var data = {
        'utoken': this.globalData.user.utoken
      }
      this.httputils.post(url, data, function (resp) {
        that.globalData.user = resp.data
        wx.setStorage({
          key: that.UrlConstant.USER_INFO,
          data: resp.data
        })
      })
    }
  },
  created () {
  },
  mounted () {
  },
  onUnload () {
    this.rechargeAmount = ''
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
