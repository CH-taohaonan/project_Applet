<template>
  <div style="background-color: #F7F7F7;position: absolute;width: 100%;height: 100%">
    <div style="text-align: center;background-color: white;margin-top: 10px;">
      <div style="padding-top: 5px">订单已完成</div>
      <div style="font-size: 12px;padding-top: 5px">感谢您对优食襄的信任，欢迎下次光临</div>
      <div style="font-size: 12px;padding-top: 5px;padding-bottom: 5px">祝您用餐愉快</div>
    </div>
    <div style="padding: 10px">
      <div style="display: flex;justify-content: space-between;background-color: white" v-for="commodity in order.commoditylist">
        <div style="padding-left: 10px;display: flex" >
          <img style="width: 50px;height: 50px;padding: 5px" :src="IMAGE_HOST + commodity.commoditypic">
          <div style="display: inline-block;padding-left: 10px;">
            <div style="text-align: center;font-size: 14px;padding-top: 5px;">{{commodity.commodityname}}</div>
            <div style="font-size: 14px;padding-top: 15px;">X{{commodity.commoditynum}}</div>
          </div>
        </div>
        <div style="display: flex;align-items: center;padding-right: 10px">
          ¥{{commodity.price}}
        </div>
      </div>

      <div style="height: 2px;background-color: #F7F7F7"></div>

<!--      <div style="display: flex;justify-content: space-between;padding-left: 10px;height: 50px;background-color: white">-->
<!--        <div style="display: flex;align-items: center">包装盒</div>-->
<!--        <div style="display: flex;align-items: center;padding-right: 10px">-->
<!--          ¥10.0-->
<!--        </div>-->
<!--      </div>-->

      <div style="height: 2px;background-color: #F7F7F7"></div>

      <div style="display: flex;justify-content: space-between;padding-left: 10px;height: 50px;background-color: white">
        <div style="display: flex;align-items: center">配送费</div>
        <div style="display: flex;align-items: center;padding-right: 10px">
          ¥{{order.freight}}
        </div>
      </div>

      <div style="height: 2px;background-color: #F7F7F7"></div>

      <div style="display: flex;justify-content: space-between;padding-left: 10px;height: 50px;background-color: white">
        <div style="display: flex;align-items: center">原价</div>
        <div style="display: flex;align-items: center;padding-right: 10px">
          ¥{{order.price}}
        </div>
      </div>

      <div style="height: 2px;background-color: #F7F7F7"></div>

      <div style="display: flex;justify-content: space-between;padding-left: 10px;height: 50px;background-color: white">
        <div style="display: flex;align-items: center">优惠</div>
        <div style="display: flex;align-items: center;padding-right: 10px">
          -¥{{order.discountAmount}}
        </div>
      </div>



      <div style="height: 2px;background-color: #F7F7F7"></div>

      <div style="display: flex;justify-content: space-between;padding-left: 10px;height: 50px;background-color: white">
        <div style="display: flex;align-items: center">&nbsp;</div>
        <div style="display: flex;align-items: center;padding-right: 10px">
          实际支付<span style="color: red">¥{{order.amount}}</span>
        </div>
      </div>

      <div style="height: 2px;background-color: #F7F7F7"></div>

      <div style="display: flex;align-items: center;justify-content: center;padding-left: 10px;height: 50px;background-color: white">
          联系商家
      </div>
    </div>
    <div style="padding-top: 10px;background-color: white;padding-left: 10px">
      <div style="display: flex;align-items: center;">
        <div style="font-size: 12px;width: 70px;display: inline">配送地址</div>
        <div style="font-size: 12px;display: inline-block;padding-left: 5px">
          <div>{{receiveInfo.address}}</div>
          <div>{{receiveInfo.name}} {{receiveInfo.genderName}} {{receiveInfo.phone}}</div>
        </div>
      </div>
      <div style="display: flex;align-items: center;padding-top: 15px">
        <div style="font-size: 12px;width: 70px;display: inline">订单编号</div>
        <div style="font-size: 12px;display: inline-block;padding-left: 5px">
          <div >{{order.ordercode}}</div>
        </div>
      </div>
      <div style="display: flex;align-items: center;padding-top: 15px;padding-bottom: 10px">
        <div style="font-size: 12px;width: 70px;display: inline">下单时间</div>
        <div style="font-size: 12px;display: inline-block;padding-left: 5px">
          <div >{{order.createtime}}</div>
        </div>
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
      orderid: '', // 订单ID
      IMAGE_HOST: this.UrlConstant.IMAGE_HOST,
      order: {}, // 订单对象
      receiveInfo: {}
    }
  },
  methods: {
    // 订单详情
    orderDesc () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'orderdesc/'
      var data = {
        'utoken': this.globalData.user.utoken,
        'orderid': this.orderid
      }
      this.httputils.post(url, data, function (resp) {
        that.order = resp.data
        that.receiveInfo = that.order.receiveInfo
      })
    }
  },
  onLoad (options) {
    this.orderid = options.orderid
  },
  mounted () {
    this.orderDesc()
  },
  created () {
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
