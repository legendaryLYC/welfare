// pages/examine/examine.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    content: [],
    userId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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

  loadPageData: function () {
    var that = this

    wx.request({
      url: app.hostConfig.host + '/checkapplication/list',
      // data: {
      //   departmentId: that.data.departmentId,
      // },
      success: function (res) {
        console.log(res.data)
        that.setData({
          content: res.data['checkList']
        })

      }
    })
  },
  yes: function (e) {
    var that = this
    console.log(this.data.hospitalName);
    wx.request({
      url: app.hostConfig.host + '/checkapplication/checkpass',
      data: {
        id: e.currentTarget.dataset.id,
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '审核成功',
          icon: 'success',
          duration: 2000
        })
        that.onLoad()
      }

    })
  },
  no: function (e) {
    var that = this
    console.log(this.data.hospitalName);
    wx.request({
      url: app.hostConfig.host + '/checkapplication/checknopass',
      data: {
        id: e.currentTarget.dataset.id,
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '拒绝成功',
          icon: 'success',
          duration: 2000
        })
        that.onLoad()
      }

    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})