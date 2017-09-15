import Config from '../../../etc/config'
const App = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({
  data:{
    goods: {},
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    goodsid:0,
    jsonorder:'',
    indicatorDots: true,
    interval: 4000,
    duration: 1000,
    currentTab: 0
  },
  onLoad(option) {
    this.setData({
      goodsid: option.id
    })
  },
  onShow: function () {
    this.getgooddetail(this.data.goodsid)
  },
  getgooddetail: function (goodsid){
    var that = this;
    wx.request({
      url: Config.basePath + 'gooddetail&goodid=' + goodsid + '&openid=' + App.globalData.openid,
      success: function (data) {
        const carttotal = data.data.data.carttotal;

        var good_ls = [];
        good_ls[0] = data.data.data;
        good_ls[0].num = that.data.num;
        good_ls[0].selected = true;
        good_ls[0].thumb_url = data.data.data.images[0].path;
        const jsonorder = JSON.stringify(good_ls);

        WxParse.wxParse('remark', 'html', data.data.data.remark, that, 5);
        WxParse.wxParse('parameter', 'html', data.data.data.parameter, that, 5);
        WxParse.wxParse('service', 'html', data.data.data.service, that, 5);
        
        if (data.data.meta.code == 0) {
          that.setData({
            goods: data.data.data,
            totalNum: carttotal,
            jsonorder: jsonorder
          })
          if (carttotal>0){
              that.setData({
                hasCarts: true
              })
          }
        }
      }
    })
  },
  addCount() {
    let num = this.data.num;
    num++;
    
    var good_ls = [];
    good_ls[0] = this.data.goods;
    good_ls[0].num = num;
    good_ls[0].selected = true;
    good_ls[0].thumb_url = this.data.goods.images[0].path;
    const jsonorder = JSON.stringify(good_ls);

    this.setData({
      num : num,
      jsonorder: jsonorder
    })
  },
    minusCount() {
    let num = this.data.num;
    if (num <= 1) {
      return false;
    }
    num--;

    var good_ls = [];
    good_ls[0] = this.data.goods;
    good_ls[0].num = num;
    good_ls[0].selected = true;
    good_ls[0].thumb_url = this.data.goods.images[0].path;
    const jsonorder = JSON.stringify(good_ls);

    this.setData({
      num: num,
      jsonorder: jsonorder
    });
  },
  addToCart() {
    const self = this;
    const num = this.data.num;
    const goodsid = this.data.goodsid
    let total = this.data.totalNum;

    wx.request({
      url: Config.basePath + 'cart&goods=' + goodsid + '&openid=' + App.globalData.openid + '&num=' + num,
      success: function (data) {
        if (data.data.meta.code == 0) {
        self.setData({
          show: true
        })
        setTimeout(function () {
          self.setData({
            show: false,
            scaleCart: true
          })
          setTimeout(function () {
            self.setData({
              scaleCart: false,
              hasCarts: true,
              totalNum: num + parseInt(total)
            })
          }, 200)
        }, 300)
        }
      }
    })

  },
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
    })
  }
 
})