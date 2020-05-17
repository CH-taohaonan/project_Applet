<template>
  <div class="jiemian">
    <div style="height: 10px;background-color: #F7F7F7"></div>

    <div v-if="addressinfo.name === '' || addressinfo.name === undefined && !globalData.receiveinfoid" style="height: 60px;font-size: 18px;display: flex;align-items: center;justify-content: space-between;background-color: white" @click="receiptAddress">
      <span style="padding-left: 20px">选择收货地址 </span>
      <span style="padding-right: 20px;padding-top: 5px"><van-icon name="arrow" /></span>
    </div>

    <div v-else  style="height: 60px;font-size: 18px;display: flex;align-items: center;justify-content: space-between;background-color: white" @click="receiptAddress">
      <div>
        <div style="font-size: 16px;padding-left: 20px">{{addressinfo.name}}&nbsp;&nbsp;&nbsp;{{addressinfo.phone}}</div>
        <div style="font-size: 14px;padding-left: 20px">{{addressinfo.address}}</div>
      </div>
      <span style="padding-right: 20px;padding-top: 5px"><van-icon name="arrow" /></span>
    </div>

    <div style="height: 10px;background-color: #F7F7F7"></div>


    <div style="display: flex;justify-content: space-between;background-color: white">
      <div style="padding-left: 10px;display: flex">
        <img style="width: 50px;height: 50px;padding: 5px" :src="IMAGE_HOST + commodity.descimglist[0].address">
        <div style="display: inline-block;padding-left: 10px;">
          <div style="text-align: center;font-size: 14px;padding-top: 5px;">{{commodity.name}}</div>
          <div style="font-size: 14px;padding-top: 15px;">X1</div>
        </div>
      </div>
      <div style="display: flex;;text-align: center;align-items: center;padding-right: 10px;font-size: 14px;color: red">
        <div>
        <div>价格:&nbsp;&nbsp;&nbsp;&nbsp;¥{{commodity.price}}</div>
        </div>
      </div>
    </div>

<!--    <div style="height: 2px;background-color: #F7F7F7"></div>-->

<!--    <div style="display: flex;justify-content: space-between;padding-left: 10px;height: 50px;background-color: white">-->
<!--      <div style="display: flex;align-items: center">包装盒</div>-->
<!--      <div style="display: flex;align-items: center;padding-right: 10px">-->
<!--        ¥10.0-->
<!--      </div>-->
<!--    </div>-->

    <div style="height: 2px;background-color: #F7F7F7"></div>

    <div style="display: flex;justify-content: space-between;padding-left: 10px;height: 50px;background-color: white">
      <div style="display: flex;align-items: center">配送费</div>
      <div style="display: flex;align-items: center;padding-right: 10px">
        ¥{{commodity.freight}}
      </div>
    </div>

    <div style="height: 2px;background-color: #F7F7F7"></div>

<!--    <div style="display: flex;justify-content: space-between;align-items: center;padding-left: 10px;height: 50px;background-color: white;padding-right: 10px;">-->
<!--&lt;!&ndash;      <div style="display: flex;align-items: center">&nbsp;</div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div style="display: flex;align-items: center;padding-right: 10px;font-size: 14px;justify-content: space-between;">&ndash;&gt;-->
<!--        <div>-->
<!--          是否使用钱包-->
<!--        </div>-->
<!--        <div style="display: flex;align-items: center">-->
<!--          {{walletamount}}&nbsp;&nbsp;元-->
<!--          <van-switch  :checked="checked" @change="onChange" />-->
<!--        </div>-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--    </div>-->

    <div style="height: 2px;background-color: #F7F7F7"></div>

    <div style="position: absolute;width: 100%; bottom: 0;display: flex;justify-content: space-between;padding-left: 10px;height: 44px;background-color: white">
      <div style="display: flex;align-items: center;color: red">
        ¥{{xsprice}}
<!--        <span v-if="checked" style="color: #99AEC7;font-size: 10px;padding-left: 10px;padding-top: 4px">已优惠{{yhprice}}</span>-->
      </div>
      <div style="margin-right: 11px">
        <van-button square  type="default" color="#F8B62D" @click="payment">去支付</van-button>
      </div>
    </div>

    <van-popup
      :show="show"
      position="bottom"
      custom-style="height: 80%"
      @close="onClose"
    >
      22222
      <Receiptaddress :message="message" v-on:addressInfo="showAddressInfo"></Receiptaddress>
    </van-popup>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Receiptaddress from '../receiptaddress/index'
export default {
  components: {
    Receiptaddress
  },

  data () {
    return {
      IMAGE_HOST: this.UrlConstant.IMAGE_HOST,
      checked: false,
      freight: 0, // 运费
      zjgprice: 0, // 总价格
      vipzjgprice: 0, // vip总价格
      xsprice: 0, // 显示总价格
      yhprice: 0, // 优惠价格
      walletamount: '', // 钱包
      shoppingcart: [], // 购物车列表
      commodity: {},
      shoplist: [], // 商品列表
      show: false,
      message: false,
      addressinfo: {}
    }
  },
  methods: {
    // 监听地址信息
    showAddressInfo (data) {
      console.log(9999, data)
      this.addressinfo = data
      this.onClose()
    },
    onClose () {
      this.show = false
    },
    // 地址列表
    addressList () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'addresslist/'
      var data = {
        'utoken': this.globalData.user.utoken
      }
      this.httputils.post(url, data, function (resp) {
        console.log(88888, resp.data)
        if (resp.data.length !== 0) {
          that.addressinfo = resp.data[0]
        }
      })
    },
    receiptAddress () {
      this.show = true
      // mpvue.navigateTo({url: '/pages/receiptaddress/main'})
    },
    onChange () {
      if (this.checked) {
        this.checked = false
        this.xsprice = this.zjgprice
      } else {
        this.checked = true
        this.yhprice = this.zjgprice - this.vipzjgprice
        this.yhprice = Math.floor(this.yhprice * 10) / 10
        this.xsprice = this.vipzjgprice
      }
    },
    syncuserInfo () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'syncuserinfo/'
      var data = {
        'utoken': this.globalData.user.utoken
      }
      this.httputils.post(url, data, function (resp) {
        console.log(resp.data)
        that.globalData.user = resp.data
        console.log(that.globalData.user)
        wx.setStorage({
          key: that.UrlConstant.USER_INFO,
          data: resp.data
        })
      })
    },
    payment () {
      console.log(this.addressinfo)
      if (!this.addressinfo.receiveinfoid) {
        this.httputils.showToast('地址不能为空')
      }
      var isusewallet = ''
      if (this.checked) {
        isusewallet = 1
      } else {
        isusewallet = 0
      }
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'createorder/'
      // console.log(this.shoppingcart)
      var commoditylist = []
      this.commodity.num = '1'
      commoditylist.push(this.commodity)
      var data = {
        utoken: this.globalData.user.utoken,
        type: '1',
        receiveinfoid: this.addressinfo.receiveinfoid,
        commodityjson: JSON.stringify(commoditylist),
        isusewallet: isusewallet
      }
      console.log(data)
      this.httputils.post(url, data, function (resp) {
        var paymentData = resp.data
        if (String(resp.data.paymenttype) === '2') {
          that.httputils.showToast('支付成功')
          that.syncuserInfo()
          mpvue.redirectTo({url: '/pages/wallet/main'})
        } else {
          wx.requestPayment(
            {
              'timeStamp': paymentData.timeStamp,
              'nonceStr': paymentData.nonceStr,
              'package': paymentData.packagevalue,
              'signType': 'MD5',
              'paySign': paymentData.sign,
              'success': function (res) {
                that.httputils.showToast('支付成功')
                that.syncuserInfo()
                mpvue.redirectTo({url: '/pages/wallet/main'})
              },
              'fail': function (res) {
                console.log(res)
                that.httputils.showToast('支付失败')
              },
              'complete': function (res) {

              }
            })
        }
      })
    }
  },
  onUnload () {
    console.log(123)
    this.show = false
    this.zjgprice = 0
    this.checked = false
    this.vipzjgprice = 0
    this.yhprice = 0
  },
  onLoad (options) {
    console.log(43543537, JSON.parse(options.commodity))
    this.commodity = JSON.parse(options.commodity)
    this.xsprice = this.commodity.price + this.commodity.freight
    // this.walletamount = this.globalData.user.walletamount
    // var shoppingcart = JSON.parse(options.shoppingcart)
    // var sumprice = 0
    // var freight = 0
    // var sumprices = 0
    // for (var i in shoppingcart) {
    //   sumprice = shoppingcart[i].price * shoppingcart[i].sum
    //   sumprice = Math.floor(sumprice * 10) / 10
    //   this.zjgprice += sumprice
    //   shoppingcart[i].sumprice = sumprice
    //   sumprices = shoppingcart[i].vipprice * shoppingcart[i].sum
    //   sumprices = Math.floor(sumprices * 10) / 10
    //   this.vipzjgprice += sumprices
    //   shoppingcart[i].vipsumprice = sumprices
    //   if (freight < shoppingcart[i].freight) {
    //     freight = shoppingcart[i].freight
    //   }
    // }
    // this.freight = freight
    // this.zjgprice = this.zjgprice + this.freight
    // this.zjgprice = Math.floor(this.zjgprice * 10) / 10
    // this.vipzjgprice = this.vipzjgprice + this.freight
    // this.vipzjgprice = Math.floor(this.vipzjgprice * 10) / 10
    // this.xsprice = this.zjgprice
    // this.shoppingcart = shoppingcart
    //
    // var shoplist = []
    // console.log('zzzzzzzzzz', this.shoppingcart)
    // for (var index in this.shoppingcart) {
    //   var shop = {
    //     commodityid: '',
    //     num: '',
    //     paramoptid: ''
    //   }
    //   shop.num = this.shoppingcart[index].sum
    //   shop.commodityid = this.shoppingcart[index].commodityid
    //   if (this.shoppingcart[index].paramoptid) {
    //     shop.paramoptid = this.shoppingcart[index].paramoptid
    //   }
    //   shoplist.push(shop)
    // }
    // this.shoplist = shoplist
    // console.log('mmmmmmmmmmmmmmm', shoplist)
  },
  created () {
  },
  mounted () {
    this.addressList()
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
  .jiemian{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #F7F7F7;
  }
</style>
