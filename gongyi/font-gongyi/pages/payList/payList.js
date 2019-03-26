// pages/payList/payList.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: [{
      fee: '专家挂号费',
      num: 1,
      total: '20元',
    }],
    second: [
      {
      fee: '阿司匹林',
      num: 2,
      total: '24元',
      }, 
      {
        fee: '开塞露',
        num: 3,
        total: '30元',
      },
    ],
    third: [
      {
      fee: '衣物床单费',
      num: 1,
      total: '60元',
      },
      {
        fee: '输液',
        num: 3,
        total: '90元',
      },
      {
        fee: '床位费',
        num: 1,
        total: '290元',
      },
    ],
    hospitalList: [],
    openId: wx.getStorageSync('openId'),
    status:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id == 1){
      this.setData({
        hospitalList : this.data.first,
        status:1,
      })
    } else if (options.id == 2){
      this.setData({
        hospitalList: this.data.second,
        //支付医药费后状态变成看病完成
        status:4
      })
    } else if (options.id == 3){
      this.setData({
        hospitalList: this.data.third,
        //支付住院费后状态变成看病完成
        status: 4
      })
    }
    
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

  },
  //点击支付按钮
  payMoney:function(){
    var that = this

    wx.request({
      url: app.hostConfig.host + '/user/inhospital',
      data: {
        openid: that.data.openId,
        status: that.data.status,
      },
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }, 2000)
      }
    })
  }
})