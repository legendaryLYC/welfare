//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
  data: {
    logs: [],
    openId: wx.getStorageSync('openId'),
    myMessege:[],
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
    this.loadPageData();
  },
  bindButtonTap: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  loadPageData: function () {
    var that = this

    wx.request({
      url: app.hostConfig.host + '/getusermesssage',
      data: {
        openId: that.data.openId,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          myMessege: res.data['messagedetail']
        })

      }
    })
  },
})
