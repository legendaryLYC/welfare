// pages/sales/sales.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    thingList:'',
    thingName: '',
    openId: wx.getStorageSync('openId'),
    thingComponent:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: app.hostConfig.host + '/things/thingslist',
      data: {
        openId:that.data.openId,
        thingComponent: that.data.thingComponent,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          thingList: res.data,
        })
      }
    })
  },
  inputThingComponent: function (e) {
    this.setData({
      thingComponent: e.detail.value
    })
  },
  sales: function(e){
    var that = this;
    var money;
    var price = e.currentTarget.dataset.price;
    var type = e.currentTarget.dataset.type;
    if(type == "图书"){
      money = price*3;
    }
    else if (type == "文具"){
      money = price * 2;
    }
    else if (type == "衣物") {
      money = price * 5;
    }
    else{
      money = price * 5;
    }
    wx.showModal({
      title: '确认卖出',
      content: '该物品价值' + money+'元',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.showToast({
            title: '成功',
            icon: 'succes',
            duration: 1000,
            mask: true,
          }),
            wx.request({
              url: app.hostConfig.host + '/things/sellthings',
              data: {
                thingId : price,
              },
              success: function (res) {
                setTimeout(function () {
                  wx.showModal({
                    title: '捐赠',
                    content: '是否将卖出的钱捐赠给贫困山区的小朋友',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                        wx.showToast({
                          title: '捐赠成功，感谢您',
                          icon: 'succes',
                          duration: 1000,
                          mask: true,
                        })
                      } else {
                        wx.showToast({
                          title: '感谢与您的合作',
                          icon: 'succes',
                          duration: 1000,
                          mask: true,
                        })
                        console.log('用户点击取消')
                      }
                    }
                  })
                }, 2000)
              }
            })
        } else {
          console.log('用户点击取消')
        }
        that.onLoad();
      }
    })
  },
  bindButtonTap: function(){
    var that = this;
    wx.request({
      url: app.hostConfig.host + '/things/thingslist',
      data: {
        openId: that.data.openId,
        thingComponent: that.data.thingComponent,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          thingList: res.data,
        })
      }
    })
  },
  bindButtonTap1: function (e) {
    var that = this;
    var thingComponent = e.currentTarget.dataset.component;
    wx.request({
      url: app.hostConfig.host + '/things/thingslist',
      data: {
        openId: that.data.openId,
        thingComponent: thingComponent,
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          thingList: res.data,
        })
      }
    })
  }
})