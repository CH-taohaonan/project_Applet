<template>
  <div>
    <div>
      <van-cell-group>
        <van-field
          :value="receiptaddress.username"
          label="收货人"
          placeholder="收货人"
          @change="onChangeusername"
        />
        <van-cell  >
<!--            <div style="padding-left: 10px">-->
            <view slot="title"  class="page__bd">
              <view class="section section_gap" >
                <van-radio-group :value=" receiptaddress.sex "  style="display: flex" @change="radioChange">
                  <van-radio checked-color="#07c160" icon-size="25px" name="1">先生</van-radio>
                  <van-radio checked-color="#07c160" icon-size="25px" style="padding-left: 20px" name="0">女士</van-radio>
                </van-radio-group>
<!--                <radio-group class="radio-group" @change="radioChange">-->
<!--                  <radio class="radio" v-for="(item,index) in receiptaddress.items"   :key="index" :value="item.name" :checked="item.checked">-->
<!--                    <div >{{item.value}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>-->
<!--                  </radio>-->
<!--                </radio-group>-->
              </view>
            </view>
<!--            </div>-->
        </van-cell>
        <van-field
          :value="receiptaddress.phone"
          label="电话"
          border="false"
          placeholder="电话"
          @change="onChangephone"
        />
        <van-field
          right-icon="arrow"
          label="地址"
          :value="location.title"
          disabled
          placeholder="点击选择"
          @click="dianji"
        />
        <van-field
          :value="receiptaddress.addressdesc"
          @change="onChangeaddressdesc"
          label="门牌号"
          placeholder="请输入门牌号"
        />
      </van-cell-group>
    </div>
    <div v-if="this.location.title === '' && this.location.receiveinfoid ===''"  style="padding: 10px">
      <van-button custom-style="border: 0;" square size="large" @click="createAddress"  color="#F8B62D">
        <div style="display: flex;justify-content: center">
          <span>保存地址</span>
        </div>
      </van-button>
    </div>
    <div v-else style="padding: 10px">
      <van-button custom-style="border: 0;" square size="large" @click="editAddress"  color="#F8B62D">
        <div style="display: flex;justify-content: center">
          <span>编辑地址</span>
        </div>
      </van-button>
    </div>

    <van-toast id="van-toast" />

  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      user: {},
      receiptaddress: {
        receiveinfoid: '',
        username: '',
        phone: '',
        addressdesc: '',
        sex: '1',
        province: '', // 省
        city: '', // 市
        district: ''// 区
        // items: [
        //   { name: '1', value: '先生', checked: 'true' },
        //   { name: '0', value: '女士' }
        // ]
      },
      location: {
        title: ''
      } // 地址
    }
  },
  methods: {
    onChangeusername (event) {
      this.receiptaddress.username = event.mp.detail
    },
    onChangephone (event) {
      this.receiptaddress.phone = event.mp.detail
    },
    onChangeaddressdesc (event) {
      this.receiptaddress.addressdesc = event.mp.detail
    },
    radioChange (event) {
      this.receiptaddress.sex = event.mp.detail
    },
    dianji () {
      // mpvue.navigateTo({url: '/pages/searchmap/main'})
      wx.redirectTo({
        url: '/pages/searchmap/main'
      })
    },
    cs1 () {
      console.log(111)
    },
    cs2 () {
      console.log(222)
    },
    // 创建收货地址
    createAddress () {
      console.log(222)
      if (!this.location.title) {
        this.httputils.showToast('请选择地址')
        return
      }
      if (!this.receiptaddress.addressdesc) {
        this.httputils.showToast('门牌号不能为空')
        return
      }
      console.log(this.receiptaddress.username)
      var address = this.location.title + this.receiptaddress.addressdesc
      var url = this.UrlConstant.HOST_NAME + 'createaddress/'
      var data = {
        utoken: this.user.utoken,
        name: this.receiptaddress.username, // required收货人姓名
        gender: this.receiptaddress.sex, // 性别 0.女 1.男
        phone: this.receiptaddress.phone, // 收货人手机号
        province: this.location.province, // 省
        city: this.location.city, // 市
        district: this.location.district, // 区
        addressdesc: this.receiptaddress.addressdesc, // 详细地址
        address: address // 完整地址
      }
      console.log(data)
      this.httputils.post(url, data, function (resp) {
        // var locationlist = resp.data.locationlist
        wx.navigateBack({
          url: '/pages/receiptaddress/main'
        })
      })
    },
    // 编辑收货地址
    editAddress () {
      if (!this.location.title) {
        this.httputils.showToast('请选择地址')
        return
      }
      if (!this.receiptaddress.addressdesc) {
        this.httputils.showToast('门牌号不能为空')
        return
      }
      console.log(this.receiptaddress.username)
      var address = this.location.title + this.receiptaddress.addressdesc
      var url = this.UrlConstant.HOST_NAME + 'editaddress/'
      var data = {
        utoken: this.user.utoken,
        receiveinfoid: this.receiptaddress.receiveinfoid,
        name: this.receiptaddress.username, // required收货人姓名
        gender: this.receiptaddress.sex, // 性别 0.女 1.男
        phone: this.receiptaddress.phone, // 收货人手机号
        province: this.receiptaddress.province, // 省
        city: this.receiptaddress.city, // 市
        district: this.receiptaddress.district, // 区
        addressdesc: this.receiptaddress.addressdesc, // 详细地址
        address: address // 完整地址
      }
      console.log(data)
      this.httputils.post(url, data, function (resp) {
        // var locationlist = resp.data.locationlist
        wx.navigateBack({
          url: '/pages/receiptaddress/main'
        })
      })
    }
  },
  mounted () {
    if (this.location.title === undefined || this.location.title === '') {
      this.receiptaddress = {
        username: '',
        phone: '',
        addressdesc: '',
        sex: '1'
      }
      this.location = {
        title: ''
      }
    } else {
      if (this.location.title !== '') {
        this.receiptaddress = {
          username: this.receiptaddress.username,
          phone: this.receiptaddress.phone,
          addressdesc: this.receiptaddress.addressdesc,
          sex: this.receiptaddress.sex,
          province: this.location.province, // 省
          city: this.location.city, // 市
          district: this.location.district // 区
        }
        if (this.location.receiveinfoid !== undefined && this.location.receiveinfoid !== '') {
          this.receiptaddress = {
            receiveinfoid: this.location.receiveinfoid,
            username: this.location.name,
            phone: this.location.phone,
            addressdesc: this.location.addressdesc,
            sex: String(this.location.gender),
            province: this.location.province, // 省
            city: this.location.city, // 市
            district: this.location.district // 区
          }
          var address = this.location.address
          var title = ''
          title = address.substring(0, address.length - this.location.addressdesc.length)
          this.location = {
            title: title
          }
        }
        console.log(6666, this.location.title)
      }
    }
    this.user = this.globalData.user
  },
  onLoad (options) {
    if (options.location) {
      this.location = JSON.parse(options.location)
      console.log(this.location)
    }
  },
  onUnload () {
    console.log(123)
    this.location = ''
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
