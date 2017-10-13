import Config from '../../../etc/config'

Page({
  data: {
    cateid: 0,
    category: [],
    goods: []
  },
  onLoad: function (options) {
    this.setData({
      cateid: options.cateid
    })
  },
  cityNameClick: function () {
    wx.navigateBack();
  },
  onShow: function () {
    this.getcategory();
    this.getgoods()
  },
  getcategory: function () {
    var that = this;
    wx.request({
      url: Config.basePath + 'category&cateid=' + this.data.cateid,
      success: function (data) {
        if (data.data.meta.code == 0) {
          that.setData({
            category: data.data.data.items
          })
        }
      }
    })
  },
  getgoods: function () {
    var that = this;
    wx.request({
      url: Config.basePath + 'goods&type=' + this.data.cateid,
      success: function (data) {
        if (data.data.meta.code == 0) {
          that.setData({
            goods: data.data.data.items
          })
        }
      }
    })
  }
})