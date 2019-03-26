// pages/donate/donate.js
import WxValidate from '../../utils/WxValidate.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welfare:'',
    welfareId:'',
    monryArray: [10, 20, 50],
    money: '',
    protocol:'',
    openId:wx.getStorageSync('openId'),
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      welfareId: options.id,  
    }),
    wx.request({
      url: app.hostConfig.host + '/welfare/welfaredetail',
      data: {
        welfareId: that.data.welfareId,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          welfare: res.data,
        })
      }
    })
    this.initValidate() //加载时调用验证规则函数
  },
  changeMoney:function(e){
    this.setData({
      money:e.currentTarget.dataset.money
    })
  },
  donateResult:function(){
    
  },
  gototdetail: function(e){
    var page = e.currentTarget.dataset.page;
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: page+'?id='+id,
    })
  },
  donateMoney: function (e){
    var that = this;
    that.setData({
      money:e.detail.value
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      protocol: {
        required: true
      },
      money: {
        digits: true,
        required: true
      },
    }
    const messages = {
      protocol:{
        required: '请同意用户协议'
      },
      money:{
        required: '请输入金额',
        digits: "请输入要捐款的金额(元)",
      },
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //验证提示
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //调用验证函数
  formSubmit: function (e) {
    const params = e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    console.log(params.protocol);
    if (params.protocol==0){
      var error = {
        msg:"请同意用户协议"
      }
      this.showModal(error);
      return false;
    }
    var that = this
    wx.showModal({
      title: '确认捐款',
      content: params.money + '元',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '捐款成功，感谢您！',
            icon: 'succes',
            duration: 1000,
            mask: true,
          })
            wx.request({
              url: app.hostConfig.host + '/user/donate',
              data: {
                welfareId: that.data.welfareId,
                openId: that.data.openId,
                money: params.money,
              },
              success: function (res) {
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
              }
            })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  }
})