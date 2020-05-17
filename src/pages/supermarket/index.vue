<template >
  <div style="background-color: #E6EDF5;height: 100vh">
    <!--    轮播-->
<!--    <div class="swiper_style" >-->
<!--      <div style="background-color: white;border-radius: 10px">-->
<!--        <div style="padding: 10px;">-->
<!--          <swiper-->
<!--            :indicator-dots="true"-->
<!--            :autoplay='true'-->
<!--            :interval='10000'-->
<!--            :duration='1000'-->
<!--            :circular='true'-->
<!--            :skip-hidden-item-layout=true-->
<!--            indicator-color='#d8d8d8'-->
<!--            indicator-active-color = '#ffad36'>-->
<!--            <block v-for="(item, index) in swiperList" :key="index" >-->
<!--              <swiper-item>-->
<!--                <img  class="swiper_img" :src="item" mode="scaleToFill" @click="swiperClick(index)"><img/>-->
<!--              </swiper-item>-->
<!--            </block>-->
<!--          </swiper>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->


    <!--    tabs-->
    <div style="background-color: #E6EDF5;">
          <div v-for="(commodity, index) in commoditylist" :key="index" style="display: inline-block;width: 50%;text-align: center;align-items: center">
            <div class="fooditem" @click="productDetails(commodity)" style="background-color: white;border-radius: 5px;padding: 5px;">
              <van-row>
                <van-col span="24">
                  <div style="padding-top: 10px">
                    <img :src="IMAGE_HOST +  commodity.img" style="width: 100px;height: 100px"/>
                  </div>
                  <div >
                    <div style="display: flex;flex-direction: column;padding-left: 15px;padding-right: 15px;padding-top: 10px">
                      <div>
                        <div style="font-size: 16px;text-align: left;text-overflow:ellipsis;overflow: hidden;white-space: nowrap;">
                          {{ commodity.name}}
                        </div>
                      <div style="display: flex;justify-content: space-between;padding-top: 5px">
                        <div style="color: red;">¥{{ commodity.price}}</div>
                        <div style="font-size: 12px;">销量{{ commodity.instocknum}}</div>
                      </div>
                      </div>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
    </div>
<!--    <div style="height: 42px">&nbsp;</div>-->
    <div v-show="!isShowLoginBtn">
      <div class="login_div_style">
        <span style="font-size:14px;color: white;margin-left: 30px;">登录后方可购买</span>
        <button  class="login_btn_style" open-type="getUserInfo"  @getuserinfo="getuserinfo" >前去登录</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        IMAGE_HOST: this.UrlConstant.IMAGE_HOST,
        imageURL: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571030402247&di=7bfd5fd3da4cce9e61a1c5934f2c8519&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180805%2Fdb36f30855e046d8a99676dc4f9242da.jpeg',
        province: '',
        city: '',
        commoditylist: [], // 商城列表
        latitude: '',
        longitude: '',
        isShowLoginBtn: false,
        code: '',
        PAGE_SIZE: '10',
        PAGE_INDEX: 0,
        swiperList: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571030402247&di=7bfd5fd3da4cce9e61a1c5934f2c8519&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180805%2Fdb36f30855e046d8a99676dc4f9242da.jpeg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571030402245&di=f6f087bb86f78918d0b3f0998ee33234&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20170706%2Fa438cf6f3c864cd8b3fd602fc67b3c17_th.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571030402243&di=8e17f47a9694bb83fba6d7366ca7d6cb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fb4ce0f95841ed9f7497a744c814ccd8fbbd97ec634d4d-g4YGtQ_fw658'

        ]
      }
    },

    components: {
    },
    methods: {
      swiperClick (index) {
        // 轮播点击
        var currentImg = this.swiperList[index]
        wx.previewImage({
          current: currentImg, // 当前显示图片的http链接
          urls: this.swiperList // 需要预览的图片http链接列表
        })
      },
      tabChange (e) {
        // tab切换
        console.log(e.target.index)
      },
      productDetails (commodity) {
        // 商品详情
        console.log(commodity)
        var commodityid = commodity.commodityid
        mpvue.navigateTo({ url: '/pages/supermarketdetail/main?commodityid=' + commodityid })
        // console.log('sssss')
      },
      getuserinfo (e) {
        console.log(e)
        if (e.mp.detail.errMsg === 'getUserInfo:ok') {
          wx.login({
            success (response) {
              var code = response.code
              mpvue.navigateTo({url: '/pages/phonelogin/main?code=' + code})
            }
          })
        } else {
        }
      },
      // 商城列表
      commodityList () {
        var that = this
        var url = this.UrlConstant.HOST_NAME + 'commoditylist/'
        var data = {
          type: '1',
          pagesize: this.PAGE_SIZE,
          pageindex: this.PAGE_INDEX
        }
        this.httputils.post(url, data, function (resp) {
          that.commoditylist = resp.data.commoditylist
        })
      }
    },
    mounted () {
      this.commodityList()
    },
    onShow () {
      this.isShowLoginBtn = this.globalData.isLogin
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
    }
  }
</script>

<style scoped >
  .swiper_style{
    background-color: #E6EDF5;
    -webkit-align-items: center;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 10px

  }
  .swiper_img{
    width: 100%;
  }
  .fooditem{
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
  }
  .fooditemdiv{
    height: 80px;
  }
  page {
    background-color: red;
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
  .login_div_style{
    background-color: #2c3743;
    position: fixed;
    　　bottom: 0;
    　　width: 100%;
    display: flex;
    align-items: center;
  }
</style>


