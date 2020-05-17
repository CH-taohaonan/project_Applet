<template>
  <div>
<!--    搜索框-->
    <van-search :value='keywords'
                use-action-slot
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @change="onChange">
      <view slot="action" @tap="onSearch">搜索</view>
    </van-search>

<!--    轮播-->
    <div class="swiper_style">
      <swiper
              :indicator-dots="true"
              :autoplay='true'
              :interval='10000'
              :duration='1000'
              :circular='true'
              :skip-hidden-item-layout=true
              indicator-color='#d8d8d8'
              indicator-active-color = '#ffad36'>
        <block v-for="(item, index) in swiperList" :key="index" >
          <swiper-item>
            <img  class="swiper_img" :src="IMAGE_HOST+item.address" mode="scaleToFill" @click="swiperClick(index)"><img/>
          </swiper-item>
        </block>
      </swiper>
    </div>
<!--    tabs-->
    <div>
          <div style="margin-top: 10px">
          <div v-for="(item, index) in menulist" :key="index">
            <div class="fooditem" @click="toCommodityDetails(item.commodityid)">
              <div>
                <van-row>
                  <van-col span="8" >
                    <div class="fooditemdiv">
                      <img :src="IMAGE_HOST+item.img" style="width: 100%;height: 100%"/>
                    </div>
                  </van-col>
                  <van-col span="12">
                    <div class="fooditemdiv" style="display: flex;align-items: center;" >
                      <div style="padding-left: 20px;display: inline-block;align-items: center;">
                        <div style="color: #333333;padding-top: 2px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.name}}</div>
                        <div style="color: #666666;font-size: 12px;padding-top: 5px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{item.desc}}</div>
                        <div style="color: #999999;font-size: 12px;padding-top: 5px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">月销&nbsp{{item.fakesalenum}}</div>
                      </div>
                    </div>
                  </van-col>
                  <van-col span="4">
                    <div class="fooditemdiv" style="color: red;display: flex;align-items: center">
                      <div>
                      <div>¥{{item.price}}</div>
                      <div style="font-size: 8px;color: #666666">会员价:&nbsp¥{{item.vipprice}}</div>
                      </div>
                    </div>
                  </van-col>
                </van-row>
              </div>
            </div>
        </div>
          </div>
      <!-- 加载进度条-->
      <div v-show="isShowLoadMore" style="text-align: center;margin-top: 8px;margin-bottom: 8px">
        <van-loading  type="spinner"  size="24px" color="#999999" />
        <span style="color: #999999;margin-left: 15px;font-size: 14px">努力加载中...</span>
      </div>

      <div v-show="!isShowLoginBtn">
      <div class="login_div_style">
        <span style="font-size:14px;color: white;margin-left: 30px;">登录后方可购买</span>
        <button  class="login_btn_style" open-type="getUserInfo"  @getuserinfo="getuserinfo" >前去登录</button>
      </div>
      </div>

      <van-toast id="van-toast" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keywords: '', // 关键字
      IMAGE_HOST: this.UrlConstant.IMAGE_HOST,
      isShowLoginBtn: false,
      code: '',
      swiperList: [],
      PAGE_SIZE: '10',
      PAGE_INDEX: 0,
      menulist: [],
      isShowLoadMore: false
    }
  },

  components: {
  },
  mounted () {
    this.requestBannerlist()
    this.requestMenulist()
  },
  onShow () {
    this.isShowLoginBtn = this.globalData.isLogin
  },
  methods: {
    onChange (event) {
      this.keywords = event.mp.detail
    },
    // 搜索
    onSearch () {
      this.PAGE_INDEX = 0
      this.requestMenulist()
    },
    swiperClick (index) {
      // 轮播点击
      var currentImg = this.IMAGE_HOST + this.swiperList[index].address
      var imglist = []
      for (var i = 0; i < this.swiperList.length; i++) {
        imglist.push(this.IMAGE_HOST + this.swiperList[i].address)
      }
      wx.previewImage({
        current: currentImg, // 当前显示图片的http链接
        urls: imglist // 需要预览的图片http链接列表
      })
    },
    toCommodityDetails (commodityid) {
      // 商品详情
      mpvue.navigateTo({ url: '/pages/fooddesc/main?commodityid=' + commodityid })
    },
    getuserinfo (e) {
      wx.login({
        success (response) {
          var code = response.code
          mpvue.navigateTo({url: '/pages/phonelogin/main?code=' + code})
        }
      })
    },
    requestBannerlist () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'bannerlist/'
      var data = {}
      this.httputils.post(url, data, function (resp) {
        that.swiperList = resp.data
      })
    },
    requestMenulist () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'commoditylist/'
      var data = {
        'pagesize': this.PAGE_SIZE,
        'pageindex': this.PAGE_INDEX + '',
        'keywords': this.keywords,
        'type': '0'
        // 'price': this.PRICE
      }
      this.httputils.post(url, data, function (resp) {
        var commoditylist = resp.data.commoditylist
        if (that.PAGE_INDEX === 0) {
          that.menulist = commoditylist
          if (commoditylist.length > 0) {
            // 显示列表、隐藏无数据布局
            that.PAGE_INDEX = that.PAGE_INDEX + 1
          } else {
            // 暂无数据
          }
        } else {
          // 加载更多
          if (commoditylist.length > 0) {
            that.menulist = that.menulist.concat(resp.data.commoditylist)
            that.PAGE_INDEX = that.PAGE_INDEX + 1
          } else {
            that.httputils.showToast('暂无更多')
          }
        }
      })
    }
  },

  created () {
    var that = this
    wx.checkSession({
      success () {
        // session_key 未过期，并且在本生命周期一直有效
        wx.getStorage({
          key: that.UrlConstant.USER_INFO,
          success (res) {
            if (res.data) {
              // 已登录
              console.log(res.data)
              that.globalData.user = res.data
              that.isShowLoginBtn = true
              that.globalData.isLogin = true
            } else {
              // 未登录
              that.isShowLoginBtn = false
              that.globalData.isLogin = false
            }
          },
          fail (res) {
            // 本地没有存储用户信息，未登录
            that.isShowLoginBtn = false
            that.globalData.isLogin = false
          }
        })
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        that.isShowLoginBtn = false
        that.globalData.isLogin = false
      }
    })
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.requestBannerlist()
    this.PAGE_INDEX = 0
    this.requestMenulist()
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
    this.requestMenulist()
    setTimeout(function () {
      // complete
      that.isShowLoadMore = false
    }, 1000)
  }
}
</script>

<style scoped >
  .swiper_style{
    -webkit-align-items: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 16px

  }
  .swiper_img{
    width: 100%;
  }
  .fooditem{
    margin-bottom: 20px;
    margin-left: 15px;
    margin-right: 15px;
  }
  .fooditemdiv{
    height: 70px;
  }
  .login_div_style{
      background-color: #2c3743;
      position: fixed;
　　bottom: 0;
　　width: 100%;
      display: flex;
      align-items: center;
  }
  .login_btn_style{
     margin-top: 10px;
     margin-bottom: 10px;
     width: 80px;
     height: 32px;
     color: white;
     display:flex;
     float: right;
     margin-right: 15px;
     justify-content:center;
     align-items:center;
     font-size: 12px;
     background-color: #F8B62D;
  }
</style>


