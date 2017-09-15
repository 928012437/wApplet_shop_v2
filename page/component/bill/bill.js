import Config from '../../../etc/config'
var app = getApp();

Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [],
    typeid:0
  },
  onShow: function () {
    var cur = this.data.typeid;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      this.getorderlist(cur)
    }
  },
  getorderlist: function (type) {
    var that = this;
    wx.request({
      url: Config.basePath + 'order&openid=' + app.globalData.openid + '&type=' + type,
      success: function (data) {
        if (data.data.meta.code == 0) {
          that.setData({
            expertList: data.data.data.items
          })
        }
      }
    })
  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      this.getorderlist(cur)
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 4) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function (option) {
    var that = this;

    that.setData({
      typeid: option.typeid
    });

    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        // console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  footerTap: app.footerTap
})
