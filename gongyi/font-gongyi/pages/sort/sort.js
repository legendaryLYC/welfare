//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    openId: wx.getStorageSync('openId'),
    user:null,
    welfareList:'',
    welfareName:'',
    welfareComponent:'',
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  gotoPage: function (e) {
    var page = e.currentTarget.dataset.page;
    var id = e.currentTarget.dataset.id;
    console.log("page:" + page);
    console.log("id:" + id);
    wx.navigateTo({
      url: page + '?id=' + id
    });

  },
  inputwelfareComponent: function(e){
    this.setData({
      welfareComponent: e.detail.value
    })
  },
  bindButtonTap: function (e) {
    var that = this
    console.log(this.data.welfareComponent);
    wx.request({
      url: app.hostConfig.host + '/welfare/welfarelist1',
      data: {
        welfareComponent: that.data.welfareComponent
      },
      success: function (res) {
        that.setData({
          welfareList: res.data['welfareList']
        })

      }

    })
  },
  bindButtonTap1: function (e) {
    var that = this
    console.log(this.data.welfareComponent);
    wx.request({
      url: app.hostConfig.host + '/welfare/welfarelist1',
      data: {
        welfareComponent: e.currentTarget.dataset.component
      },
      success: function (res) {
        that.setData({
          welfareList: res.data['welfareList']
        })

      }

    })
  },
  inputWelfareName: function (e) {
    this.setData({
      welfareName: e.detail.value
    })
  },
  onLoad: function (thing) {
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
  loadPageData: function (options) {
    var that = this

    wx.request({
      url: app.hostConfig.host + '/welfare/welfarelist',
      success: function (res) {
        console.log(res.data)
        that.setData({
          welfareList: res.data['welfareList'],
        })

      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
