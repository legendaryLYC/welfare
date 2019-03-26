import WxValidate from '../../utils/WxValidate.js'
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    form: {
      name: '',
      sex: '',
      age:'',
      identify: '',
      address: '',
      phoneNum: '',
      birthday:'',
    },
    openId: wx.getStorageSync('openId'),
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.initValidate()//验证规则函数

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //验证提示
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      phoneNum: {
        required: true,
        tel: true
      },
      sex: {
        required: true,
      },
      identify:{
        required: true,
        idcard: true,
      },
      address: {
        required: true,
      },
      age: {
        required: true,
        digits: true,
      },
      birthday: {
        required: true,
        date: true,
      },
    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength: '请输入正确的名称'
      },
      phone: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      sex: {
        required: '请选择性别'
      },
      identify: {
        required: '请填写身份证号',
        idcard: '请输入正确的身份证号',
      },
      address: {
        required: '请填写地址'
      },
      age:{
        required: '请填写年龄信息',
        digits:'请输入数字',
      },
      birthday: {
        required: true,
        date: '请输入有效日期',
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    var that = this

    wx.request({
      url: app.hostConfig.host + '/user/inhospital',
      data: {
        name: params.name,
        sex: params.sex,
        identify: params.identify,
        address: params.address,
        tel: params.phoneNum,
        openid: that.data.openId,
        status: 2,
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '申请已提交, 请等待审核',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/homepage/homepage',
          })
        }, 2000)

      }
    })
  }
})
