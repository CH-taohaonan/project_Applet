<template>
  <div style="background-color: white">
    <div style="height: 25vh;margin: 20px;border-radius: 10px;background-color: #F5BE48;display: flex;justify-content:center;align-items: center">
      <div style="width: 100%;padding-left: 30px;padding-right: 30px">
        <div style="font-size: 18px;color: white">我的余额(元)</div>
        <div style="display: flex;justify-content: space-between;padding-top: 20px;align-items: center;">
        <div style="font-size: 30px;color: white">{{walletAmount}}</div>
        <div style="font-size: 20px;color: white;display: flex;align-items: center" @click="Recharge">充值
          <van-icon custom-style="margin-top: 5px" size="20px" name="arrow" />
        </div>
      </div>
      </div>
    </div>
    <div>
      <div style="padding-left: 20px;">
        明细
      </div>
      <div style="margin: 20px;">
        <div v-for="wallet in walletBilllist" style="border-radius: 5px;padding: 15px;display: flex;justify-content: space-between;align-items: center;box-shadow: 0px 2px 5px 2px #F5F5F5">
          <div style="margin: 5px;background-color: white">
            <div>{{wallet.name}}</div>
            <div style="padding-top: 10px;color: #999999">{{wallet.createtime}}</div>
          </div>
          <div v-if="wallet.bill > 0" style="color: red;font-size: 16px;font-weight: bold">+{{wallet.bill}}</div>
          <div v-else style="color: gray;font-size: 16px;font-weight: bold">{{wallet.bill}}</div>
        </div>

      </div>
      <div v-show="isShowLoadMore" style="text-align: center;margin-top: 8px;margin-bottom: 8px">
        <van-loading  type="spinner"  size="24px" color="#999999" />
        <span style="color: #999999;margin-left: 15px;font-size: 14px">努力加载中...</span>
      </div>

      <van-toast id="van-toast" />
    </div>

  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      PAGE_SIZE: '10',
      PAGE_INDEX: 0,
      isShowLoadMore: false,
      walletAmount: 0,
      walletBilllist: [],
      dataNum: 0
    }
  },
  methods: {
    walletIndex () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'walletindex/'
      var data = {
        'utoken': this.globalData.user.utoken,
        pagesize: this.PAGE_SIZE,
        pageindex: this.PAGE_INDEX
      }
      this.httputils.post(url, data, function (resp) {
        console.log(88888, resp.data)
        that.walletAmount = resp.data.walletAmount
        var walletBilllist = resp.data.walletBilllist
        that.dataNum = resp.data.dataNum

        if (that.PAGE_INDEX === 0) {
          that.walletBilllist = walletBilllist
          if (walletBilllist.length > 0) {
            // 显示列表、隐藏无数据布局
            that.PAGE_INDEX = that.PAGE_INDEX + 1
          } else {
            // 暂无数据
          }
        } else {
          // 加载更多
          if (walletBilllist.length > 0) {
            that.walletBilllist = that.walletBilllist.concat(resp.data.walletBilllist)
            console.log(that.walletBilllist)
            that.PAGE_INDEX = that.PAGE_INDEX + 1
          } else {
            that.httputils.showToast('暂无更多')
          }
        }
      })
    },
    Recharge () {
      // 充值页面
      mpvue.navigateTo({url: '/pages/walletmoney/main'})
    }
  },
  // onShow () {
  //   this.PAGE_INDEX = 0
  // },
  // 下拉刷新
  onPullDownRefresh () {
    this.PAGE_INDEX = 0
    this.walletIndex()
    wx.showNavigationBarLoading() // 在标题栏中显示加载
    // 模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() // 完成停止加载
      wx.stopPullDownRefresh() // 停止下拉刷新
    }, 1000)
  },
  onReachBottom () {
    var that = this
    this.isShowLoadMore = true
    this.walletIndex()
    setTimeout(function () {
      // complete
      that.isShowLoadMore = false
    }, 1000)
  },
  created () {
  },
  mounted () {
    this.PAGE_INDEX = 0
    this.walletIndex()
  },
  onShow () {
    this.walletIndex()
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
