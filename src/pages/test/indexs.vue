<template>
  <div>
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
            <img  class="swiper_img" :src="IMAGE_HOST + item.address" mode="scaleToFill" @click="swiperClick(index)"><img/>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div style="padding-left: 10px">
      <div>{{fooddesc.name}}</div>
      <div style="font-size: 12px;padding-top: 10px">月售{{fooddesc.fakesalenum}}</div>
      <div style="padding-top: 10px;display: flex;justify-content: space-between">
        <div style="color: red;width: 30%;display: inline" v-if="foodprice === ''">¥{{fooddesc.price}}</div>
        <div style="color: red;width: 30%;display: inline" v-else>¥{{foodprice}}</div>
        <div style="width: 50%;display: inline;text-align: right;padding-right: 10px">
          <van-stepper value="1" @change="onChange" />
        </div>
      </div>
    </div>
    <div style="height: 10px;background-color: #F7F7F7"></div>
    <div style="padding-left: 10px;padding-right: 10px;">
      <div style="overflow-x: scroll">
        <div>素菜</div>

        <scroll-view  scroll-x="true" style="white-space: nowrap; display: flex;width: 100%">
          <div v-for="(item, index) in commoditylist" :key="index" style="display: inline-block;padding: 5px;width: 26%;">
            <div v-if="item.istrue" @click="dianji(index)">

              <div style="position: relative">
              <img style="width: 100%;height: 80px" :src="IMAGE_HOST + item.img">
              <div style="position: absolute;right: 5px;bottom: 5px">
                <img src="../../../static/images/queding.png" style="width: 20px;height: 20px;">
              </div>
              </div>
              <div style="width: 100%;text-align: center;font-size: 14px;background-color: #F8B62D;border-radius: 12px">
                <span style="color: white">{{item.name}}</span>
              </div>
            </div>
            <div v-else style="width: 100%" @click="dianji(index)">
              <img style="width: 100%;height: 80px" :src="IMAGE_HOST + item.img">
              <div style="width: 100%;text-align: center;font-size: 14px;background-color: #EDEDED;border-radius: 12px">{{item.name}}</div>
            </div>
          </div>
        </scroll-view>
      </div>
      <div v-if="decide === '1'">
        <div>荤菜</div>
        <div  >
          <scroll-view  scroll-x="true" style="white-space: nowrap; display: flex;width: 100%">
            <div v-for="(item, index) in imgUrlss" :key="index" style="display: inline-block;padding: 5px;width: 26%;">
              <div v-if="item.istrue" @click="dianjis(index)">
                <div style="position: relative">
                  <img style="width: 100%;height: 80px" :src="item.url">
                  <div style="position: absolute;right: 5px;bottom: 5px">
                    <img src="../../../static/images/queding.png" style="width: 20px;height: 20px;">
                  </div>
                </div>
                <div style="width: 100%;text-align: center;font-size: 14px;background-color: #F8B62D;border-radius: 12px">
                  <span style="color: white">{{item.name}}</span>
                </div>
              </div>
              <div v-else style="width: 100%" @click="dianjis(index)">
                <img style="width: 100%;height: 80px" :src="item.url">
                <div style="width: 100%;text-align: center;font-size: 14px;background-color: #EDEDED;border-radius: 12px">{{item.name}}</div>
              </div>
            </div>
          </scroll-view>
        </div>
      </div>
      <div style="height: 50px">&nbsp;</div>
    </div>
    <div style="position: fixed;bottom: 0;width: 100%">
      <button style="width: 100%;"  @click="submitOrder">
        <span style="color: black">去结算</span>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },

  data () {
    return {
      IMAGE_HOST: this.UrlConstant.IMAGE_HOST,
      decide: '', // 判断
      commodityid: '',
      foodprice: '', // 价格
      PAGE_SIZE: '10',
      PAGE_INDEX: 0,
      PRICE: '0',
      commoditylist: [

      ],
      fooddesc: {},
      logs: [],
      imgUrls: [
        {
          name: '红烧肉',
          url: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
          istrue: true
        },
        {
          name: '自行车',
          url: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
          istrue: false
        },
        {
          name: '周星驰',
          url: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870',
          istrue: false
        },
        {
          name: '周星驰',
          url: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870',
          istrue: false
        },
        {
          name: '周星驰',
          url: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870',
          istrue: false
        }
      ],
      imgUrlss: [
        {
          name: '红烧肉',
          url: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/newsPicture/05558951-de60-49fb-b674-dd906c8897a6',
          istrue: true
        },
        {
          name: '自行车',
          url: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/coursePicture/0fbcfdf7-0040-4692-8f84-78bb21f3395d',
          istrue: false
        },
        {
          name: '周星驰',
          url: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870',
          istrue: false
        },
        {
          name: '周星驰',
          url: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870',
          istrue: false
        },
        {
          name: '周星驰',
          url: 'http://mss.sankuai.com/v1/mss_51a7233366a4427fa6132a6ce72dbe54/management-school-picture/7683b32e-4e44-4b2f-9c03-c21f34320870',
          istrue: false
        }
      ],
      swiperList: []
    }
  },
  onLoad (options) {
    console.log(options)
    this.commodityid = options.commodityid
    this.decide = options.decide
  },
  methods: {
    onChange (event) {
      console.log(event.mp.detail)
      var price = this.fooddesc.price
      this.foodprice = price * event.mp.detail
      this.foodprice = Math.floor(this.foodprice * 10) / 10
    },
    submitOrder () {
      mpvue.navigateTo({url: '/pages/submitorder/main'})
    },
    dianji (index) {
      console.log(index)

      for (var inde in this.commoditylist) {
        if (inde === String(index)) {
          this.commoditylist[inde].istrue = true
        } else {
          this.commoditylist[inde].istrue = false
        }
      }
    },
    dianjis (index) {
      console.log(index)
      for (var inde in this.imgUrlss) {
        if (inde === String(index)) {
          this.imgUrlss[inde].istrue = true
        } else {
          this.imgUrlss[inde].istrue = false
        }
      }
    },
    swiperClick (index) {
      // 轮播点击
      var currentImg = this.IMAGE_HOST + this.swiperList[index].address
      var imglist = []
      for (var i = 0; i < this.swiperList.length; i++) {
        imglist.push(this.IMAGE_HOST + this.swiperList[i].address)
      }
      // console.log(imglist)
      wx.previewImage({
        current: currentImg, // 当前显示图片的http链接
        urls: imglist // 需要预览的图片http链接列表
      })
    },
    commodityDesc () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'commoditydesc/'
      var data = {
        commodityid: this.commodityid
      }
      this.httputils.post(url, data, function (resp) {
        // console.log(resp.data)
        that.swiperList = resp.data.bannerimglist
        that.fooddesc = resp.data
        // console.log(that.swiperList)
      })
    },
    // 素菜列表
    commodityList () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'commoditylist/'
      var data = {
        'pagesize': this.PAGE_SIZE,
        'pageindex': this.PAGE_INDEX + '',
        'type': '0',
        'price': this.PRICE
      }
      this.httputils.post(url, data, function (resp) {
        console.log(6666, resp)
        var commoditylist = resp.data.commoditylist
        for (var i in commoditylist) {
          commoditylist[i]['istrue'] = false
        }
        commoditylist[0]['istrue'] = true
        that.commoditylist = commoditylist
      })
    }
  },
  mounted () {
    this.commodityDesc()
    this.commodityList()
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
button::after {
  border-radius: 0;
}
button{
  border-radius: 0;
}
.swiper_style{
  -webkit-align-items: center;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 16px

}
.swiper_img{
  width: 100%;
}
</style>
