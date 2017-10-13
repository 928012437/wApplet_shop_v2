var app = getApp();
import Config from '../../../etc/config'

Page({
  onShareAppMessage: function () {
    return {
      title: '微狐小程序',
      desc: '专业微信小程序定制开发团队',
      path: 'page/component/index'
    }
  },
  data: {
    vertical:true,
    num: 1,
    totalNum: 0,
    hasCarts: false,
    curIndex: 0,
    show: false,
    scaleCart: false,
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    expertList: [],
    category:[],
    showModalStatus:[]
  },
  onShow: function () {
    this.getcategory();
    this.setData({
      currentTab:0
    });
  },
  getcategory:function(){
    var that = this;
    wx.request({
      url: Config.basePath + 'category',
      success: function (data) {
        if (data.data.meta.code == 0) {
          that.setData({
            category: data.data.data.items
          })
          that.getgoods(data.data.data.items[0].id)
        }
      }
    })
  },
  getgoods: function (id) {
    var that = this;
    var showModalStatusarr=[];
    wx.request({
      url: Config.basePath + 'goods&type='+id,
      success: function (data) {
        if (data.data.meta.code == 0) {
          data.data.data.items.forEach(function(v){
            showModalStatusarr.push(false);
          });
          that.setData({
            expertList: data.data.data.items,
            showModalStatus: showModalStatusarr,
            num: 1
          })

        }
      }
    })
  },
  addcart:function(e){
    var goodsid = e.currentTarget.dataset.id;
    var num = this.data.num;
    var showModalStatus = this.data.showModalStatus;
    
    wx.request({
      url: Config.basePath + 'cart&goods=' + goodsid + '&openid=' + app.globalData.openid + '&num=' + num,
      success: function (data) {
        if (data.data.meta.code == 0) {
          wx.showToast({
              title: '添加成功'
            });
          showModalStatus.forEach(function (v, k) {
            showModalStatus[k] = false;
          });
          this.setData(
            {
              showModalStatus: showModalStatus,
              num: 1
            }
          );
        }else{
          console.log(data.data.meta.message)
        }
      }
    })
  },
  addCount() {
    let num = this.data.num;
    num++;
    this.setData({
      num: num
    })
  },
  minusCount() {
    let num = this.data.num;
    if (num <= 1) {
      return false;
    }
    num--;
    this.setData({
      num: num
    });
  },
  redirect_my_jianzhi: function (e) {
    var good_ls=[];
    let num = this.data.num;
    good_ls[0] = this.data.expertList[e.currentTarget.dataset.index];
    good_ls[0].num = num;
    good_ls[0].selected=true;
    var jsonorder = JSON.stringify(good_ls);
    wx.navigateTo({
      url: '../orders/orders?orders=' + jsonorder,
      success: function (res) {
        // success 
      },
      fail: function () {
        // fail 
      },
      complete: function () {
        // complete 
      }
    })
  }, 
  bindTap(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex: index
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
    var id = e.target.dataset.id;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
      this.getgoods(id)
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
  setModalStatus: function (e) {
    // console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.status);
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })

    var showModalStatus = this.data.showModalStatus;
    var index = e.currentTarget.dataset.index;

    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export()
    })
    if (e.currentTarget.dataset.status == 1) {
      showModalStatus[index] =true
      this.setData(
        {
          showModalStatus: showModalStatus
        }
      );
    }
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation
      })
      if (e.currentTarget.dataset.status == 0) {
        showModalStatus.forEach(function(v,k){
          showModalStatus[k]=false;
        });
        this.setData(
          {
            showModalStatus: showModalStatus,
            num:1
          }
        );
      }
    }.bind(this), 200)
  },
  onLoad: function () {
    var that = this;
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
