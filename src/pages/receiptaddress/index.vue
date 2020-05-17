<template>
  <div class="jiemian" >
      <div style= "height:100%;overflow-y: scroll">
        <van-radio-group :value="radio" @change="onChange">
        <div  v-for="(list, index) in addresslist" :key="index">
          <van-cell
            value-class="value-class"
            clickable
            :data-name="index"
            @click="onClick(list, index)"
          >
            <div style="display: flex;align-items: center;height: 50px;">
              <div style="padding-left: 0;align-items: center;display: flex">
                <div style="display: inline-block;">
                  <van-radio :name="index" style="margin-top: 10px" />
                </div>
                <div style="display: inline-block;padding-left: 10px">
                  <div style="text-align: left;font-size: 12px">{{list.address}}</div>
                  <div style="text-align: left;font-size: 12px">{{list.name}}&#12288;{{list.sex}}&#12288;{{list.phone}}</div>
                </div>
              </div>
              <div style="position: absolute;right: 0;" v-if="message === undefined || message === ''">
                <div @click="addressInfo(list)" style="display: inline-block">
                  <img style="width: 16px;height: 16px;padding-right: 10px" src="../../../static/images/xiugai.png">
                </div>
                <div  @click="deleteAddressInfo(list)" style="display: inline-block">
                  <img style="width: 16px;height: 16px;padding-right: 10px" src="../../../static/images/shanchu.png">
                </div>
              </div>

            </div>
          </van-cell>
        </div>
        </van-radio-group>
        <div style="height: 60px">&nbsp;</div>
        <div style="position: absolute;width: 100%; bottom: 0;display: flex;justify-content: center;padding-left: 10px;background-color: white">
          <van-button custom-style="border: 0;" square size="large" @click="addAddres">
            <div style="display: flex;justify-content: center">
              <img style="width: 30px;height: 30px;padding-top: 10px" src="../../../static/images/jiahao.png">
              <span>新增收货地址</span>
            </div>
          </van-button>
        </div>
      </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Dialog from '../../../static/vant/dialog/dialog'
export default {
  components: {
  },
  props: ['message'],
  data () {
    return {
      receiveinfoid: '', // 地址ID
      radio: '0',
      addresslist: []
    }
  },
  methods: {
    onChange (event) {
      // console.log(222222)
      // this.radio = 0
    },
    onClick (data, index) {
      this.setdefaultAddress(data.receiveinfoid)
      // this.radio = String(index)

      this.radio = '0'
      var that = this
      if (this.message !== undefined || this.message !== '') {
        that.globalData.receiveinfoid = data.receiveinfoid
        that.$emit('addressInfo', data)
        console.log(data)
      }
      // this.radio = String(index)
    },
    // 设置默认地址
    setdefaultAddress (receiveinfoid) {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'setdefaultaddress/'
      var data = {
        utoken: this.globalData.user.utoken,
        receiveinfoid: receiveinfoid
      }
      this.httputils.post(url, data, function (resp) {
        console.log(6666666, resp)
        that.addressList()
      })
    },
    addAddres () {
      // 跳转添加收货地址
      mpvue.navigateTo({url: '/pages/addaddres/main'})
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
        that.addresslist = resp.data
      })
    },
    // 删除地址信息
    deleteAddress () {
      var that = this
      var url = this.UrlConstant.HOST_NAME + 'deleteaddress/'
      var data = {
        'utoken': this.globalData.user.utoken,
        'receiveinfoid': this.receiveinfoid
      }
      this.httputils.post(url, data, function (resp) {
        that.addressList()
      })
    },
    // 获取地址信息
    addressInfo (data) {
      data.title = '判断字段'
      var location = JSON.stringify(data)
      console.log(111, location)
      wx.navigateTo({
        url: '/pages/addaddres/main?location=' + location
      })
      wx.setNavigationBarTitle({
        title: '编辑收货地址'
      })
    },
    // 删除地址信息
    deleteAddressInfo (data) {
      var that = this
      this.receiveinfoid = data.receiveinfoid
      Dialog.confirm({
        title: '是否删除该地址信息?',
        message: '删除后无法恢复?'
      }).then(() => {
        // on confirm
        that.deleteAddress()
      }).catch(() => {
        // on cancel
      })
    }
  },
  mounted () {
    this.addressList()
  },
  onShow () {
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
  overflow-y: hidden;
  width: 100vm;
  /*height: 100vh;*/
  background-color: #F7F7F7;
}
.value-class {
  flex: none !important;
}
</style>
