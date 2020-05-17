<template >
  <div style="background-color: #E6EDF5;height: 100vh">
    <!--    轮播-->
    <div class="swiper_style" >
      <div style="background-color: white;border-radius: 10px">
        <div style="padding: 10px;">
          <swiper
            :indicator-dots="true"
            :autoplay='true'
            :interval='10000'
            :duration='1000'
            :circular='true'
            :skip-hidden-item-layout=true
            indicator-color='#d8d8d8'
            indicator-active-color = '#ffad36'>
            <block v-for="(item, index) in commodity.descimglist" :key="index" >
              <swiper-item>
                <img  class="swiper_img"  :src="IMAGE_HOST + item.address" mode="scaleToFill" @click="swiperClick(index)"><img/>
              </swiper-item>
            </block>
          </swiper>
        </div>
      </div>
      <div style="background-color: white;border-radius: 10px;margin-top: 10px">
        <div style="padding: 10px;">
          <div style="font-weight: 600">
            {{commodity.name}}
          </div>
          <div style="color: red;padding-top: 5px">
            ¥ {{commodity.price}}
          </div>
          <div style="display: flex;justify-content: space-between;padding-top: 5px;font-size: 14px;color: #919294">
            <div>运费: {{commodity.freight}}</div>
            <div>销量: {{commodity.fakesalenum}}</div>
            <div>库存: {{commodity.instocknum}}</div>
          </div>
          <van-divider />
          <div style="text-align: center;color: red;font-weight: 600">
            {{commodity.desc}}
          </div>
          <van-divider borderColor="red"></van-divider>
          <div>
            进度款哈萨克接电话看见爱上
          </div>
        </div>
      </div>
    </div>
    <div style="position: absolute;left: 0;bottom: 0;right: 0">
<!--      <button  class="login_btn_style" open-type="getUserInfo"  @getuserinfo="getuserinfo" >前去登录</button>-->
      <button style="width: 100%;color: white;background-color: red" open-type="getUserInfo" @getuserinfo="getuserinfo"> 立即购买</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        imageURL: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571030402247&di=7bfd5fd3da4cce9e61a1c5934f2c8519&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180805%2Fdb36f30855e046d8a99676dc4f9242da.jpeg',
        province: '',
        city: '',
        latitude: '',
        commodityid: '', // 商品ID
        commodity: {}, // 商品
        IMAGE_HOST: this.UrlConstant.IMAGE_HOST,
        longitude: '',
        isShowLoginBtn: false,
        code: '',
        swiperList: [
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571030402247&di=7bfd5fd3da4cce9e61a1c5934f2c8519&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180805%2Fdb36f30855e046d8a99676dc4f9242da.jpeg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571030402245&di=f6f087bb86f78918d0b3f0998ee33234&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20170706%2Fa438cf6f3c864cd8b3fd602fc67b3c17_th.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571030402243&di=8e17f47a9694bb83fba6d7366ca7d6cb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fb4ce0f95841ed9f7497a744c814ccd8fbbd97ec634d4d-g4YGtQ_fw658'

        ]
      }
    },
    onLoad (option) {
      this.commodityid = option.commodityid
    },
    components: {
    },
    mounted () {
      this.commodityDesc(this.commodityid)
    },
    methods: {
      swiperClick (index) {
        // 轮播点击
        // var currentImg = this.IMAGE_HOST + this.commodity.descimglist[index].address
        // wx.previewImage({
        //   current: currentImg, // 当前显示图片的http链接
        //   urls: this.commodity.descimglist // 需要预览的图片http链接列表
        // })
      },
      // 商品详情
      commodityDesc (commodityid) {
        var that = this
        var url = this.UrlConstant.HOST_NAME + 'commoditydesc/'
        var data = {
          commodityid: commodityid
        }
        this.httputils.post(url, data, function (resp) {
          console.log(resp)
          that.commodity = resp.data
        })
      },
      getuserinfo (e) {
        console.log(e)
        if (this.globalData.isLogin) {
          mpvue.navigateTo({url: '/pages/submitorder_cs/main?commodity=' + JSON.stringify(this.commodity)})
          // mpvue.navigateTo({url: '/pages/submitorder/main?shoppingcart=' + JSON.stringify(this.globalData.shoppingcart)})
        } else {
          if (e.mp.detail.errMsg === 'getUserInfo:ok') {
            wx.login({
              success (response) {
                var code = response.code
                mpvue.navigateTo({url: '/pages/phonelogin/main?code=' + code})
              }
            })
          } else {
          }
        }
      }
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
    height: 100%;
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
</style>


