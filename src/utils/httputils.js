
import UrlConstant from '../constant/UrlConstant.js'
import md5 from 'js-md5'
import Toast from '../../static/vant/toast/toast'
export default {
  post (url, data, callback) {
    var atoken = this.createAtoken(data)
    data['atoken'] = atoken
    var context = this
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (response) {
        // console.log(response.data)
        context.handleResquestResult(response, callback)
      },
      fail (response) {
        console.log('失败')
        context.showToast('网络异常')
      },
      complete (response) {
        console.log('完成')
      }
    })
  },
  handleResquestResult (response, callback) {
    console.log(response)
    if (response.statusCode === 200) {
      var json = response.data
      switch (json.code) {
        case '200':
          if (callback) {
            callback(json)
          }
          break
        // #成功后吐司
        case '201':
          if (callback) {
            callback(json)
          }
          this.showToast(json.desc)
          break
        // #成功后弹对话框提示，确定后消失
        case '202':
          if (callback) {
            callback(json)
          }
          this.showToast(json.desc)
          break
        case '400':
          break
        // #请求失败，弹吐司
        case '401':
          this.showToast(json.desc)
          break
        // #请求失败，弹对话框
        case '402':
          this.showToast(json.desc)
          break
        // # utoken不存在，用户未认证，需要登录
        case '403':
          this.showToast(json.desc)
          break
        // # 未找到结果
        case '404':
          this.showToast(json.desc)
          break
        // # atoken验证失败
        case '405':
          this.showToast(json.desc)
          break
        // # 数据不合法
        case '406':
          break
        // #服务器内部错误
        case '500':
          this.showToast('服务器错误')
          break
        // #服务器繁忙
        case '501':
          this.showToast('服务器繁忙')
          break
      }
    } else {
      this.showToast('网络异常')
    }
  },
  callback (response) {
  },
  // 加密方法
  createAtoken (data) {
    data['timestamp'] = String(new Date().getTime())
    // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
    var newkey = Object.keys(data).sort().reverse()
    // console.log(newkey)
    var newObj = {} // 创建一个新的对象，用于存放排好序的键值对
    // console.log(typeof newObj)
    for (var i = 0; i < newkey.length; i++) {
      // 遍历newkey数组
      // console.log('33333', typeof data[newkey[i]])
      var value = String(data[newkey[i]])
      if (value !== 'undefined' && value !== '' && value !== 'null') {
        // console.log('sssssssss')
        newObj[newkey[i]] = String(data[newkey[i]])
      }
      // console.log(newObj)
      // 向新创建的对象中按照排好的顺序依次增加键值对
    }
    var result = JSON.stringify(newObj).replace(new RegExp(' ', 'g'), '') + UrlConstant.API_KEY
    // console.log('加密前：' + result)
    result = md5(result).toUpperCase()
    // console.log('加密后：' + result)
    return result // 返回排好序的新对象
  },
  showToast (content) {
    var toastDict = {
      message: content,
      duration: 800,
      position: 'bottom'
    }
    Toast(toastDict)
  }
}
