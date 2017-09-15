import Config from '../../../etc/config'
const App = getApp()

Page({
  data:{
    address:{},
    hasAddress: false,
    total:0,
    orders:[],
    cart:0
  },
  onLoad(option) {
    var orders_ori = JSON.parse(option.orders);
    var cart = option.cart;
    var orders=[];
    orders_ori.forEach(function(v){
      if (v.selected){
        orders.push(v);
      }
    });
    
    this.setData({
      orders: orders,
      cart: cart
    })
    
  },
  onReady() {
    this.getTotalPrice();
  },
  
  onShow:function(){
    const that = this;

    wx.request({
      url: Config.basePath + 'defaddress&openid=' + App.globalData.openid,
      success: function (data) {
        if (data.data.meta.code == 0) {
          that.setData({
            address: data.data.data,
            hasAddress:true
          })
        }
      }
    })

  },

  /**
   * 计算总价
   */
  getTotalPrice() {
    let orders = this.data.orders;
    let total = 0;
    for(let i = 0; i < orders.length; i++) {
      total += orders[i].num * orders[i].price;
    }
    this.setData({
      total: total
    })
  },

  toPay() {

    var address_id = this.data.address.id;
    var params = {
      items: [],
      address_id: address_id,
    }
    
    this.data.orders.forEach(n => {
      if (!n.goodsid){
        n.goodsid=n.id
      }
      params.items.push({
        id: n.goodsid,
        price: n.price,
        total: n.num
      })
    })
    params = JSON.stringify(params);
    this.setData({
      'params': params
    })

    var that = this;
    
    //统一下单接口对接
    wx.request({
      url: Config.basePath + 'wxpay',
      data: {
        openid: App.globalData.openid,
        body: '山东微狐小商城',
        momeny: that.data.total
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (response) {
        // console.log(response)

        // 发起支付
        wx.requestPayment({
          'timeStamp': response.data.timeStamp,
          'nonceStr': response.data.nonceStr,
          'package': response.data.package,
          'signType': 'MD5',
          'paySign': response.data.paySign,
          'success': function (res) {
            wx.showToast({
              title: '支付成功'
            });
            // 生成订单
           
            wx.request({
              url: Config.basePath + 'createorder&openid=' + App.globalData.openid + '&momeny=' + that.data.total + '&params=' + params + '&cart=' + this.data.cart,
              success: function (data) {
                if (data.data.meta.code == 0) {
                  wx.switchTab({
                    url: '/page/component/user/user'
                  })
                }
              }
            })
           
          }
        });
      }
    });

  }
})