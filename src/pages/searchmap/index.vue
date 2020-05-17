<template>
  <div >
    <div style="position: fixed;left: 0;top: 0;right: 0; height: 12vh;z-index: 10;">
      <van-search
        placeholder="请输入搜索地址"
        use-action-slot
        @change="ssadd"
        :value="keywords"
      >
      </van-search>

      <van-divider custom-style="margin: 2px" />
    </div>
    <div style="padding-left: 12px;padding-top: 12vh;overflow-y:scroll;z-index: 1">
      <div>
        <van-icon name="location-o" />
        <span style="font-size: 14px;padding-left: 5px">附近地址</span>
      </div>
      <div  style="padding-top: 10px;padding-left: 10px"  v-for="location in locationlist">
        <div @click="getAddress(location)">
          <div >{{location.title}}</div>
          <div style="font-size: 12px;color: #8B8B8B;padding-top: 8px">{{location.address}}</div>
          <van-divider custom-style="margin: 5px" />
        </div>
      </div>
    </div>
    <div v-show="isShowLoadMore" style="text-align: center;margin-top: 8px;margin-bottom: 8px">
      <van-loading  type="spinner"  size="24px" color="#999999" />
      <span style="color: #999999;margin-left: 15px;font-size: 14px">努力加载中...</span>
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
      keywords: '',
      user: {},
      location: {},
      locationlist: [],
      dataNum: '',
      isShowLoadMore: false
    }
  },
  methods: {
    // 点击获得地址
    getAddress (data) {
      // console.log(222, data)
      var location = JSON.stringify(data)
      console.log(111, location)
      wx.redirectTo({
        url: '/pages/addaddres/main?location=' + location
      })
      // mpvue.navigateTo({url: '/pages/addaddres/main?location=' + location})
    },
    ssadd (event) {
      this.keywords = event.mp.detail
      this.PAGE_INDEX = 0
      this.locationList()
    },
    locationList () {
      console.log(this.keywords)
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'locationlist/'
      var data = {
        'utoken': this.user.utoken,
        'pagesize': this.PAGE_SIZE,
        'pageindex': this.PAGE_INDEX + '',
        'lat': this.location.lat + '',
        'lng': this.location.lng + '',
        'keywords': this.keywords
      }
      this.httputils.post(url, data, function (resp) {
        console.log(resp.data)
        var locationlist = resp.data.locationlist
        that.dataNum = resp.data.dataNum

        if (that.PAGE_INDEX === 0) {
          that.locationlist = locationlist
          if (locationlist.length >= that.PAGE_SIZE) {
            // 显示列表、隐藏无数据布局
            that.PAGE_INDEX = that.PAGE_INDEX + 1
          } else {
            // 暂无数据
          }
        } else {
          // 加载更多
          if (locationlist.length >= that.PAGE_SIZE) {
            that.locationlist = that.locationlist.concat(resp.data.locationlist)
            that.PAGE_INDEX = that.PAGE_INDEX + 1
          } else {
            that.httputils.showToast('暂无更多')
          }
        }
      })
    }
  },
  created () {
  },
  // 下拉刷新
  onPullDownRefresh () {
    wx.stopPullDownRefresh() // 停止下拉刷新
  },
  onReachBottom () {
    var that = this
    this.isShowLoadMore = true
    this.locationList()
    setTimeout(function () {
      // complete
      that.isShowLoadMore = false
    }, 1000)
  },
  mounted () {
    this.keywords = ''
    this.locationlist = []
    // this.user = this.globalData.user
    this.user = this.globalData.user
    console.log(this.globalData)
    this.location = this.globalData.location
    this.locationList()
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
