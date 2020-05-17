<template>
  <div>
  <div>
    <div class="swiper_style">
      <swiper
        style="height: 50vh"
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
    <div style="padding-left: 10px;padding-top: 20px">
      <div style="display: flex;justify-content: space-between">
       <div style="font-size: 18px;color: #333333">{{fooddesc.name}}</div>
        <div style="font-size: 12px;color: #666666;margin-right: 10px;margin-top: 2px">月售：{{fooddesc.fakesalenum}}</div>
      </div>
      <div style="font-size: 12px;color: #666666;margin-top: 6px">配送费：¥{{fooddesc.freight}}</div>
      <div style="padding-top: 10px;display: flex;justify-content: space-between">
        <div>
        <div style="color: red;display: inline;font-size: 18px" >¥{{fooddesc.price}}</div>
        <div style="color: #666666;display: inline;margin-left: 10px;font-size: 12px" >会员价：¥{{fooddesc.vipprice}}</div>
        </div>

        <div  v-if="isShowParamopts" style="width: 50%;display: inline;text-align: right;padding-right: 10px">
            <van-button round type="info" @click="openSpecificationDialog" color="#F8B62D" size="small">选规格</van-button>
        </div>
          <div v-else style="padding-right: 10px;">
            <van-icon size="25px" name="plus" @click="addToShoppingcart" />
          </div>
        </div>
      </div>
    </div>


    <div class="btn_div_style">
      <van-row>
        <van-col span="4"  >
          <div style="text-align: center" :class="{animated:isshowAnnimated ,bounce:isshowAnnimated}" @animationend="annimatedEnd">
            <van-goods-action-icon   icon="cart-o" @click="openShoppingCart"  text="购物车" :info="shoppingCartNum" />
          </div>
        </van-col>
        <van-col span="10">
            <div style="display: flex;background-color: black;color: white;height: 50px;align-items: center">
              <div style="margin-left: 10px">
                <div style="font-size: 16px">
                  ¥{{sumAmount}}
                  <span style="font-size: 8px;">会员价:¥{{sumVipAmount}}</span>
                </div>
                <div style="margin-top: 5px">
                  <div style="font-size: 10px;">另需配送费¥{{sumFreight}}</div>
                </div>
              </div>
              </div>
        </van-col>
        <van-col span="10">
          <van-goods-action-button text="立即购买" open-type="getUserInfo" @getuserinfo="getuserinfo" />
        </van-col>
      </van-row>

    </div>
<!--      <van-goods-action id="vangoodsaction">-->
<!--        <van-goods-action-icon icon="chat-o"  text="客服" dot />-->

<!--        <div>{{this.sumAmount}}</div>-->
<!--        <div>{{this.sumVipAmount}}</div>-->
<!--        <div>{{this.sumFreight}}</div>-->
<!--        <van-goods-action-button :text="this.sumAmount+';'+this.sumVipAmount+';'+this.sumFreight" />-->

<!--      </van-goods-action>-->

<!--    购物车弹窗-->
      <van-popup
        :show="isShowShoppingcartDialog"
        position="bottom"
        custom-style="min-height: 20%;max-height: 80%;margin-bottom: 50px;"
        @close="onShoppingCartClose"
        overlay="false"
      >


        <div style="height: 40px">
          <div style=";display: flex;justify-content: space-between;font-size: 12px;z-index: 101">
            <div style="padding: 10px">已选商品</div>
            <div style="padding: 10px" @click="clearShoppingcart"><img src="../../../static/images/delete.png" style="height: 12px;width: 12px;" >清空购物车</div>
          </div>
        </div>
        <div style="min-height: 20vh;max-height: 75vh;overflow-y: scroll">
          <van-divider custom-style="margin: 0 0;" />
          <div v-for="(shoppingcart,index) in shoppingcartlist" :key="shoppingcart.index">

            <div style="margin-left: 15px;margin-right: 15px;margin-top: 15px">
              <van-row>
                <van-col span="5" >
                  <div class="fooditemdiv">
                    <img :src="IMAGE_HOST+shoppingcart.bannerimglist[0].address" style="width: 100%;height: 100%;overflow: hidden;"/>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="fooditemdiv" >
                    <div style="padding-left: 20px;">
                      <div style="padding-top: 2px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{shoppingcart.name}}</div>

                      <div>
                      <div v-if="shoppingcart.selectedParamOpt.name" style="font-size: 12px;padding-top: 5px;color: #666666;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{shoppingcart.selectedParamOpt.name}}</div>
                      <div v-else="shoppingcart.selectedParamOpt.name">
                        <div v-if="shoppingcart.desc" style="font-size: 12px;padding-top: 5px;color: #666666;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;" >{{shoppingcart.desc}}</div>
                        <div v-else style="font-size: 12px;padding-top: 5px;color: #666666">暂无描述</div>
                      </div>

                      </div>

                      <div>

                        <div style="font-size: 12px;color: red;display: inline-block">¥{{shoppingcart.sumprice}}</div>
                        <div style="font-size: 8px;color: #666666;display: inline-block;margin-left: 8px">会员价:&nbsp¥{{shoppingcart.sumvipprice}}</div>

                      </div>
                    </div>
                  </div>
                </van-col>
                <van-col span="7">
                  <div class="fooditemdiv" style="display: flex;align-items: flex-end;justify-content:flex-end">
                    <div>
                      <div>
                        <van-stepper button-size="20px" min="0" :value="shoppingcart.num" @change="onShoppingCartNumChanges($event, index)" integer />
                      </div>
                    </div>
                  </div>
                </van-col>
              </van-row>
              <van-divider custom-style="margin-left: 28%;margin-top: 15px" />
            </div>

          </div>
        </div>
      </van-popup>

<!--    规格弹窗-->
    <van-popup
      :show="isShowSpecificationDialog"
      custom-style="width: 80%;height: 40%"
      @close="onSpecificationClose"
    >
      <div>
        <div style="padding-top: 10px;text-align: center;font-size: 14px">{{fooddesc.name}}</div>
        <div style="padding-left: 10px;font-size: 14px">规格</div>
        <div style="height: 25vh;overflow-y: scroll;padding-bottom: 20px;">
            <div  v-for="(par, index) in paramopts" :key="par.id" style="display: inline-block;padding: 10px;text-align: center;align-items: center;">
              <div v-if="par.istrue" @click="selectedSpecification(index)">
                <div  style="border: 1px;background-color: white;border-style: solid;border-color: #D4A33C;color:#D4A33C;align-items: center;display: flex;justify-content: center;flex-direction: column;;" >
                  <label style="color: firebrick">{{par.name}}</label>
                </div>
              </div>
              <div v-else>
                <div  style="border: 1px;background-color: white;border-style: solid;border-color: #D6D6D6;color: #D6D6D6;align-items: center;display: flex;justify-content: center;flex-direction: column;" @click="selectedSpecification(index)" >
                  <label >{{par.name}}</label>
                </div>
              </div>
            </div>
        </div>
          <div style="position: absolute;bottom: 0;height: 50px;width: 100%;background-color: #F4F4F4;">
            <div style="border-color: #F4F4F2;position: absolute;left: 10px;bottom: 15px;">
              <div style="color: red;">¥{{selectedParamOpt.price}}
                <span style="font-size: 10px">(会员价:¥{{selectedParamOpt.vipprice}})</span>
              </div>
            </div>
            <div style="border-color: #F4F4F2;position: absolute;right: 10px;bottom: 10px;">
              <van-button size="small" color="#F8B62D" @click="addToShoppingcart">加入购物车</van-button>
            </div>
          </div>

        </div>

    </van-popup>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
// const utils = require('../../utils/throttle.js')
export default {
  components: {
    // util
  },

  data () {
    return {
      paramopts: [], // 规格列表
      isShowParamopts: false, // 判断是否显示规格
      isShowSpecificationDialog: false, // 是否打开规格选项
      isShowShoppingcartDialog: false,
      shoppingcartlist: [],
      IMAGE_HOST: this.UrlConstant.IMAGE_HOST,
      commodityid: '',
      foodprice: '', // 价格
      PAGE_SIZE: '10',
      PAGE_INDEX: 0,
      PRICE: '0',
      commoditylist: [
      ],
      fooddesc: {},
      swiperList: [],
      shoppingCartNum: 0,
      sumAmount: 0,
      sumVipAmount: 0,
      sumFreight: 0,
      selectedParamOpt: '',
      isshowAnnimated: false
    }
  },
  onLoad (options) {
    this.commodityid = options.commodityid
  },
  onUnload () {
    this.isShowParamopts = false
    this.shoppingCartNum = 0
    this.selectedParamOpt = ''
    this.isShowShoppingcartDialog = false
  },
  methods: {
    // 更改 规格选中
    selectedSpecification (index) {
      for (var i in this.paramopts) {
        this.paramopts[i].istrue = false
      }
      this.paramopts[index].istrue = true
      this.selectedParamOpt = this.paramopts[index]
      console.log(this.selectedParamOpt)
    },
    // 打开规格选项
    openSpecificationDialog () {
      this.isShowSpecificationDialog = true
    },
    // 打开或关闭购物车
    openShoppingCart () {
      if (this.isShowShoppingcartDialog) {
        this.isShowShoppingcartDialog = false
      } else {
        this.isShowShoppingcartDialog = true
      }
    },
    onShoppingCartClose () {
      this.isShowShoppingcartDialog = false
    },
    onSpecificationClose () {
      this.isShowSpecificationDialog = false
    },
    onShoppingCartNumChanges (event, index) {
      this.globalData.shoppingcart[index]['num'] = event.mp.detail
      if (this.globalData.shoppingcart[index]['selectedParamOpt']) {
        // 有规格
        this.globalData.shoppingcart[index]['sumprice'] = new this.Decimal(this.globalData.shoppingcart[index]['selectedParamOpt'].price).mul(new this.Decimal(this.globalData.shoppingcart[index]['num'])).toNumber().toFixed(2)
        this.globalData.shoppingcart[index]['sumvipprice'] = new this.Decimal(this.globalData.shoppingcart[index]['selectedParamOpt'].vipprice).mul(new this.Decimal(this.globalData.shoppingcart[index]['num'])).toNumber().toFixed(2)
      } else {
        // 无规格
        this.globalData.shoppingcart[index]['sumprice'] = new this.Decimal(this.globalData.shoppingcart[index]['price']).mul(new this.Decimal(this.globalData.shoppingcart[index]['num'])).toNumber().toFixed(2)
        this.globalData.shoppingcart[index]['sumvipprice'] = new this.Decimal(this.globalData.shoppingcart[index]['vipprice']).mul(new this.Decimal(this.globalData.shoppingcart[index]['num'])).toNumber().toFixed(2)
      }
      this.shoppingCartNum = this.getShoppingcartNum()
      this.getShoppingcartSumPrice()
    },
    getuserinfo () {
      var that = this
      if (this.globalData.isLogin) {
        if (this.globalData.shoppingcart) {
          if (this.globalData.shoppingcart.length === 0) {
            that.httputils.showToast('请选择商品!')
          } else {
            mpvue.navigateTo(
              {url: '/pages/submitorder/main?shoppingcart=' + JSON.stringify(this.globalData.shoppingcart) + '&sumAmount=' + this.sumAmount + '&sumFreight=' + this.sumFreight + '&sumVipAmount=' + this.sumVipAmount})
          }
        } else {
          that.httputils.showToast('请选择商品!')
        }
      } else {
        wx.login({
          success (response) {
            var code = response.code
            mpvue.navigateTo({url: '/pages/phonelogin/main?code=' + code})
          }
        })
      }
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
    requestCommodityDesc () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'commoditydesc/'
      var data = {
        commodityid: this.commodityid
      }
      this.httputils.post(url, data, function (resp) {
        that.swiperList = resp.data.bannerimglist
        that.fooddesc = resp.data

        if (that.fooddesc.paramopts.length !== 0) {
          for (var i in that.fooddesc.paramopts) {
            that.fooddesc.paramopts[i]['istrue'] = false
          }
          that.fooddesc.paramopts[0]['istrue'] = true
          that.paramopts = that.fooddesc.paramopts
          that.isShowParamopts = true
          that.selectedParamOpt = that.fooddesc.paramopts[0]
        } else {
          that.isShowParamopts = false
        }
      })
    },
    // 获取商品信息
    addToShoppingcart () {
      if (this.globalData.shoppingcart && this.globalData.shoppingcart.length !== 0) {
        // 购物车有数据
        var isInShoppingcart = false
        for (var index in this.globalData.shoppingcart) {
          if (this.globalData.shoppingcart[index].commodityid === this.fooddesc.commodityid) {
            if (!this.isShowParamopts) {
              // 无规格,有该商品
              isInShoppingcart = true
              this.globalData.shoppingcart[index]['num'] = this.globalData.shoppingcart[index]['num'] + 1
              this.globalData.shoppingcart[index]['sumprice'] = new this.Decimal(this.globalData.shoppingcart[index]['price']).mul(new this.Decimal(this.globalData.shoppingcart[index]['num'])).toNumber().toFixed(2)
              this.globalData.shoppingcart[index]['sumvipprice'] = new this.Decimal(this.globalData.shoppingcart[index]['vipprice']).mul(new this.Decimal(this.globalData.shoppingcart[index]['num'])).toNumber().toFixed(2)
              break
            } else {
              // 有规格
              if (this.globalData.shoppingcart[index]['selectedParamOpt'].optid === this.selectedParamOpt.optid) {
                isInShoppingcart = true
                this.globalData.shoppingcart[index]['num'] = this.globalData.shoppingcart[index]['num'] + 1
                this.globalData.shoppingcart[index]['sumprice'] = new this.Decimal(this.globalData.shoppingcart[index]['selectedParamOpt'].price).mul(new this.Decimal(this.globalData.shoppingcart[index]['num'])).toNumber().toFixed(2)
                this.globalData.shoppingcart[index]['sumvipprice'] = new this.Decimal(this.globalData.shoppingcart[index]['selectedParamOpt'].vipprice).mul(new this.Decimal(this.globalData.shoppingcart[index]['num'])).toNumber().toFixed(2)
                break
              }
            }
          }
        }
        if (!isInShoppingcart) {
          this.fooddesc['num'] = 1
          this.fooddesc['selectedParamOpt'] = this.selectedParamOpt
          this.fooddesc['selectedParamOpt'] = this.selectedParamOpt
          if (this.fooddesc['selectedParamOpt']) {
            this.fooddesc['sumprice'] = this.fooddesc['selectedParamOpt'].price
            this.fooddesc['sumvipprice'] = this.fooddesc['selectedParamOpt'].vipprice
          } else {
            this.fooddesc['sumprice'] = this.fooddesc['price']
            this.fooddesc['sumvipprice'] = this.fooddesc['vipprice']
          }
          this.globalData.shoppingcart.unshift(Object.assign({}, this.fooddesc))
        }
      } else {
        // 购物车没数据
        this.fooddesc['num'] = 1
        this.fooddesc['selectedParamOpt'] = this.selectedParamOpt
        if (this.fooddesc['selectedParamOpt']) {
          this.fooddesc['sumprice'] = this.fooddesc['selectedParamOpt'].price
          this.fooddesc['sumvipprice'] = this.fooddesc['selectedParamOpt'].vipprice
        } else {
          this.fooddesc['sumprice'] = this.fooddesc['price']
          this.fooddesc['sumvipprice'] = this.fooddesc['vipprice']
        }
        this.globalData.shoppingcart.unshift(Object.assign({}, this.fooddesc))
      }
      this.shoppingCartNum = this.shoppingCartNum + 1
      this.isShowSpecificationDialog = false
      this.shoppingcartlist = this.globalData.shoppingcart
      this.getShoppingcartSumPrice()
      this.shoppingcartAnimate()
    },
    // 清空购物车
    clearShoppingcart () {
      this.globalData.shoppingcart = []
      this.shoppingcartlist = []
      this.isShowShoppingcartDialog = false
      this.shoppingCartNum = 0
      this.sumAmount = 0
      this.sumVipAmount = 0
      this.sumFreight = 0
    },
    getShoppingcartNum () {
      this.shoppingCartNum = 0
      for (var index in this.globalData.shoppingcart) {
        this.shoppingCartNum = this.shoppingCartNum + this.globalData.shoppingcart[index]['num']
      }
      return this.shoppingCartNum
    },
    getShoppingcartSumPrice () {
      // 获取购物车总价
      var freightlist = []
      this.sumAmount = 0
      this.sumVipAmount = 0
      this.sumFreight = 0
      for (var index in this.globalData.shoppingcart) {
        this.sumAmount = new this.Decimal(this.sumAmount).add(new this.Decimal(this.globalData.shoppingcart[index]['sumprice'])).toNumber().toFixed(2)
        this.sumVipAmount = new this.Decimal(this.sumVipAmount).add(new this.Decimal(this.globalData.shoppingcart[index]['sumvipprice'])).toNumber().toFixed(2)
        freightlist.push(this.globalData.shoppingcart[index]['freight'])
      }
      console.log(freightlist)
      if (freightlist.length > 0) {
        this.sumFreight = Math.max(...freightlist)
      }
      console.log(this.sumAmount + ';' + this.sumVipAmount + ';' + this.sumFreight)
    },
    shoppingcartAnimate () {
      this.isshowAnnimated = true
    },
    annimatedEnd () {
      this.isshowAnnimated = false
    }
  },
  mounted () {
    this.requestCommodityDesc()
    if (this.globalData.shoppingcart) {
      this.shoppingCartNum = this.getShoppingcartNum()
      this.getShoppingcartSumPrice()
    } else {
      this.shoppingCartNum = 0
      this.globalData.shoppingcart = []
    }
    this.shoppingcartlist = this.globalData.shoppingcart
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
  height: 50vh;
  -webkit-align-items: center;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 16px

}
.swiper_img{
  height: 100%;
  width: 100%;
}
.btn_div_style{
  /*background-color: #2c3743;*/
  position: fixed;
  　　bottom: 0;
  　　width: 100%;
  z-index: 101;
  /*display: flex;*/
  /*align-items: center;*/
}

</style>
<style>

  #icon.van-goods-action-icon {
    width: 100%!important;
    /*position: fixed;*/
    /*right: 5px;*/
    border: none!important;
  }
  .van-goods-action{
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    /*background-color: var(--white,#fff);*/
  }
   .fooditemdiv{
     height: 70px;
   }
</style>
