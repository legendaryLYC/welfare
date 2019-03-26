//logs.js
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()
Page({
  data: {
    logs: [],
    informationUser: null,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId: wx.getStorageSync('openId'),
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
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    });
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
  bindButtonTap: function () {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  loadPageData: function () {
    var that = this

    wx.request({
      url: app.hostConfig.host + '/getuserinfor',
      data: {
        openId: that.data.openId,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          informationUser: res.data['informationUser']
        })

      }
    })
  },
})
