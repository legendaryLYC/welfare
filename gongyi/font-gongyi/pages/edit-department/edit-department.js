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
    userId: '',
    name: '',
    hospitalId: 0,
    hospital: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
      'hospitalId': options.id,
    });
    this.loadPageData();
  },
  nameChange: function (e) {
    let that = this;
    that.setData({
      name: e.detail.value,
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  edit: function () {
    var that = this

    wx.request({
      url: app.hostConfig.host + '/departmentedit/save',
      data: {
        id: that.data.hospitalId,
        name: that.data.name,
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/hospital/hospital',
          })
        }, 2000)
      }
    })
  },
  bindButtonTap: function () {
    wx.navigateTo({
      url: '/pages/department/department',
    })
  },
  loadPageData: function () {
    var that = this

    wx.request({
      url: app.hostConfig.host + '/departmentedit/edit',
      data: {
        id: that.data.hospitalId,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          hospital: res.data['department'],
          name: res.data['department'].name,
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})