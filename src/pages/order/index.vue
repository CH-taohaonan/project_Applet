<template>
  <div style="background-color: #F7F7F7;" v-if="isLogin">
<!--    <div style="padding: 10px">全部订单</div>-->
    <div v-if="orderlist.length > 0">
    <div style="background-color: white;margin: 10px;padding-left: 10px;" v-for="order in orderlist"  >
      <div style="display: flex;align-items: center;padding-top: 10px" @click="orderDetails(order.orderid)">
        <img style="width: 30px;height: 30px;background-color: red" :src="IMAGE_HOST + order.commoditylist[0].commoditypic">
        <span style="padding-left: 5px">{{order.ordername}}<van-icon name="arrow" /></span>
      </div>
      <div style="padding-left: 35px;font-size: 14px;color: #666666" @click="orderDetails(order.orderid)">
        <div style="padding-top: 5px">下单时间：{{order.createtime}}</div>
        <div style="padding-top: 5px">订单编号：{{order.ordercode}}</div>
        <div style="padding-top: 5px">总价：{{order.amount}}</div>
      </div>
      <div style="display: flex;justify-content: flex-end;padding-right: 20px;padding-bottom: 10px">
        <van-button round >再来一单</van-button>
      </div>
    </div>
    </div>
    <div v-else  style="display:flex ;align-items: center;justify-content: center;height: 100vh">
      <div >
      <img src="../../../static/images/ddym.png" style="height: 150px;width: 150px">
      <div style="text-align: center;">
        暂无订单
      </div>
      </div>
    </div>
    <!-- 加载进度条-->
    <div v-show="isShowLoadMore" style="text-align: center;margin-top: 8px;margin-bottom: 8px">
      <van-loading  type="spinner"  size="24px" color="#999999" />
      <span style="color: #999999;margin-left: 15px;font-size: 14px">努力加载中...</span>
    </div>
    <van-toast id="van-toast" />
    </div>
    <div v-else  style="display:flex ;align-items: center;justify-content: center;height: 100vh">
      <div >
        <img src="../../../static/images/ddym.png" style="height: 150px;width: 150px">
        <div style="text-align: center;">
          <button  class="login_btn_style" open-type="getUserInfo"  @getuserinfo="getuserinfo" >前去登录</button>
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
      isLogin: '',
      isShowLoadMore: false,
      IMAGE_HOST: this.UrlConstant.IMAGE_HOST,
      PAGE_SIZE: '10',
      PAGE_INDEX: 0,
      orderlist: [] // 商品列表
    }
  },

  methods: {
    orderDetails (orderid) {
      // 订单详情
      mpvue.navigateTo({url: '/pages/orderdetails/main?orderid=' + orderid})
    },
    getuserinfo (e) {
      wx.login({
        success (response) {
          var code = response.code
          mpvue.navigateTo({url: '/pages/phonelogin/main?code=' + code})
        }
      })
    },
    // 订单列表
    orderList () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'orderlist/'
      var data = {
        'utoken': this.globalData.user.utoken,
        'keywords': '',
        'pagesize': this.PAGE_SIZE,
        'pageindex': this.PAGE_INDEX
      }
      this.httputils.post(url, data, function (resp) {
        // that.orderlist = resp.data.orderlist
        var orderlist = resp.data.orderlist
        if (that.PAGE_INDEX === 0) {
          that.orderlist = orderlist
          if (orderlist.length > 0) {
            // 显示列表、隐藏无数据布局
            that.PAGE_INDEX = that.PAGE_INDEX + 1
          } else {
            // 暂无数据
          }
        } else {
          // 加载更多
          if (orderlist.length > 0) {
            that.orderlist = that.orderlist.concat(resp.data.orderlist)
            that.PAGE_INDEX = that.PAGE_INDEX + 1
          } else {
            that.httputils.showToast('暂无更多')
          }
        }
      })
    }
  },
  onShow () {
    this.isLogin = this.globalData.isLogin
    console.log(this.isLogin)
    if (this.globalData.isLogin) {
      this.orderList()
    }
  },
  mounted () {
  },
  created () {
  },
  // 下拉刷新
  onPullDownRefresh () {
    if (this.globalData.isLogin) {
      this.PAGE_INDEX = 0
      this.orderList()
      wx.showNavigationBarLoading() // 在标题栏中显示加载
      // 模拟加载
      setTimeout(function () {
        // complete
        wx.hideNavigationBarLoading() // 完成停止加载
        wx.stopPullDownRefresh() // 停止下拉刷新
      }, 1000)
    }
  },
  onReachBottom () {
    if (this.globalData.isLogin) {
      var that = this
      this.isShowLoadMore = true
      this.orderList()
      setTimeout(function () {
        // complete
        that.isShowLoadMore = false
      }, 1000)
    }
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}
.login_btn_style{
  /*margin-top: 10px;*/
  /*margin-bottom: 10px;*/
  width: 80px;
  height: 32px;
  color: white;
  display:flex;
  /*float: right;*/
  text-align: center;
  /*margin-right: 15px;*/
  justify-content:center;
  align-items:center;
  font-size: 12px;
  background-color: #F8B62D;
}
.log-item {
  margin: 10rpx;
}
</style>
