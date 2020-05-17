<template>
  <div>
    <van-cell  title="头像"  center style="height: 40px">
        <img :src="userinfo.avatarUrl" style="width: 35px;height: 35px;border-radius: 50%">
    </van-cell>
    <van-cell title="昵称"   :value="userinfo.nickName" />
    <van-cell title="性别"  :value="userinfo.genderName" />
<!--    <van-cell title="出生日期"  :value="userinfo.genderName" />-->
    <van-cell title="手机号"  :value="userinfo.phone" />
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      userinfo: {}
    }
  },

  created () {
  },
  onShow () {
    var that = this
    wx.getStorage({
      key: this.UrlConstant.USER_INFO,
      success (res) {
        console.log(res.data)
        that.userinfo = res.data
      },
      fail () {
        // console.log('失败')
      }
    })
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
