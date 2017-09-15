import Config from '../../etc/config'

Page({
  data: {
    imgUrls: [],
    category: [],
    newgoods: [],
    indicatorDots: false,
    interval: 3000,
    autoplay: false,
    duration: 800,
  },
  onShow:function(){
    this.getadd()
    this.getcategory()
    this.getnewgoods()
  },
  getadd:function(){
    var that = this;
    wx.request({
      url: Config.basePath +'adv',
      success: function (data) {
        if (data.data.meta.code == 0) {
          that.setData({
            imgUrls: data.data.data.items
          })
        }
      }
    })
  },
  getcategory:function(){
    var that = this;
    wx.request({
      url: Config.basePath + 'category&limit=3',
      success: function (data) {
        if (data.data.meta.code == 0) {
          that.setData({
            category: data.data.data.items
          })
        }
      }
    })
  },
  getnewgoods: function () {
    var that = this;
    wx.request({
      url: Config.basePath + 'goods&isnew=1',
      success: function (data) {
        if (data.data.meta.code == 0) {
          that.setData({
            newgoods: data.data.data.items
          })
        }
      }
    })
  }

})