<template>
  <div style="background-color: #F7F7F7;position: absolute;width: 100%;height: 100%;">
    <div @click="personalData" v-if="userinfo.avatarUrl">
    <img src="../../../static/images/xingzhuang.png" style="position: absolute;width: 100%;height:150px;left: 0;top: 0;right: 0;z-index: 0;">
      <div style="position: relative;padding-left: 20px;padding-top: 40px;display: flex;align-items: center;" >
        <div style="width: 80px;height: 80px;">
          <img style="width: 80px;height: 80px;border-radius: 50%" :src="userinfo.avatarUrl" >
        </div>
        <div style="display: inline-block;padding-left: 40px">
          <div>{{userinfo.nickName}}</div>
          <div style="padding-top: 10px">{{userinfo.phone}}</div>
        </div>
      </div>
    </div>
    <div v-else >
      <img src="../../../static/images/xingzhuang.png" style="position: absolute;width: 100%;height:150px;left: 0;top: 0;right: 0;z-index: 0;">
      <div style="position: relative;padding-left: 20px;padding-top: 40px;display: flex;align-items: center;" >
        <div style="width: 80px;height: 80px;">
          <img style="width: 80px;height: 80px;border-radius: 50%" src="../../../static/images/touxiang.png" >
        </div>
        <div style="display: inline-block;padding-left: 20px">
          <div>登录/注册</div>
          <div style="padding-top: 10px">登录后可享更多权限</div>
        </div>
      </div>
    </div>

    <div style="padding-top: 30px">
    </div>
    <div>
      <van-cell is-link title="个人资料" url="/pages/personaldata/main">
        <img  slot="icon" style="width: 20px;height: 20px;margin-right: 10px" src="../../../static/images/wddd.png">
      </van-cell>

      <van-cell  is-link title="我的钱包" url="/pages/wallet/main" :value="walletamount+'元'">
        <img  slot="icon" style="width: 20px;height: 20px;margin-right: 10px" src="../../../static/images/wallet_icon.png">
      </van-cell>

      <van-cell  is-link title="我的地址" url="/pages/receiptaddress/main">
        <img  slot="icon" style="width: 20px;height: 20px;margin-right: 10px" src="../../../static/images/dz.png">
      </van-cell>

      <van-cell  is-link title="联系我们" @click="contractUs">
        <img  slot="icon" style="width: 20px;height: 20px;margin-right: 10px" src="../../../static/images/lxwm.png">
      </van-cell>
    </div>
    <div style="padding-top: 50px;width: 100%; bottom: 0;display: flex;justify-content: space-between;" v-if="islogin">
      <button style="width: 100%;background-color: white"  @click="outLogin">
        <span style="color: black">退出登录</span>
      </button>
    </div>

    <view v-if="!islogin" style="position: absolute;left: 0;right: 0;bottom: 0;top: 0;width: 100%;height: 100%">
      <button  class="okbtn" bindtap='oknum' @getuserinfo="getuserinfo" open-type="getUserInfo">    </button>
    </view>
    <van-dialog id="van-dialog" />
  </div>
</template>


<script>
import Dialog from '../../../static/vant/dialog/dialog'
export default {
  components: {
  },

  data () {
    return {
      userinfo: {},
      islogin: false,
      walletamount: 0, // 钱包金额
      isLogin: false
    }
  },
  onShow () {
    var that = this
    if (this.globalData.isLogin) {
      console.log('zzzzzzzzzz', this.globalData.user.walletamount)
      this.walletamount = this.globalData.user.walletamount
      wx.getStorage({
        key: this.UrlConstant.USER_INFO,
        success (res) {
          console.log(res.data)
          that.userinfo = res.data
          that.islogin = true
        },
        fail () {
          // console.log('失败')
        }
      })
    }
  },
  methods: {
    contractUs () {
      wx.makePhoneCall({
        phoneNumber: '07103258668'
      })
    },
    outLogin () {
      // 退出登录
      var that = this
      Dialog.confirm({
        title: '',
        message: '确认是否退出登录'
      }).then(() => {
        // on confirm
        that.globalData.isLogin = false
        that.userinfo = {}
        that.walletamount = 0
        that.islogin = false
        try {
          wx.clearStorageSync()
        } catch (e) {
          // Do something when catch error
        }
        mpvue.navigateTo({url: '/pages/mine/main'})
      }).catch(() => {
        // on cancel
      })
    },
    getuserinfo (e) {
      wx.login({
        success (response) {
          var code = response.code
          mpvue.navigateTo({url: '/pages/phonelogin/main?code=' + code})
        }
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
      })
    }
  },
  mounted () {
  },
  created () {
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
.okbtn{
  width:100%;
  height:100%;
  text-align: center;
  line-height: 38px;
  background-color: transparent;   /*按钮透明*/
  border:none;				/*设置按钮边框*/
}
.okbtn::after{
  border:none
}
</style>
