//index.js
//获取应用实例
const app = getApp()
const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    years,
    year: date.getFullYear(),
    months,
    month: 2,
    days,
    day: 2,
    value: [9999, 1, 1],
    array: ['8:00', '10:00', '14:00', '16:00'],
    primarySize: 'default',
    doctorId:0,
    doctor:null,
    openId: wx.getStorageSync('openId'),
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //日期选择器
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //时段下拉框
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
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
    
    this.setData({
      index : 0,
      date : "2019-05-01",
      doctorId: options.id,
    })
    this.loadPageData(); 
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //挂号预约请求
  orderDoc:function(e){
    var that = this
    
    wx.request({
      url: app.hostConfig.host + '/user/inhospital',
      data: {
        doctorId: that.data.doctorId,
        openid: that.data.openId,
        status:0,
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '预约成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/payment/payment',
          })
        }, 2000)

      }
    })
  },
  loadPageData: function (options) {
    var that = this

    wx.request({
      url: app.hostConfig.host + '/doctor/doctordetail',
      data: {
        doctorId: that.data.doctorId,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          doctor: res.data['doctor']
        })

      }
    })
  },
  inputHospitalName: function (e) {
    this.setData({
      hospitalName: e.detail.value
    })
  }


})
