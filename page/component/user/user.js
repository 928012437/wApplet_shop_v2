import Config from '../../../etc/config'
const App = getApp()

Page({
  data:{
    thumb:'',
    nickname:'',
    orders:[],
    hasAddress:false,
    address:{},
    // orderItems
    orderItems: [
      {
        typeId: 0,
        name: '全部',
        imageurl: '/image/me1.jpg',
      },
      {
        typeId: 1,
        name: '待发货',
        imageurl: '/image/me2.jpg',
      },
      {
        typeId: 2,
        name: '已发货',
        imageurl: '/image/me3.jpg'
      },
      {
        typeId: 3,
        name: '已完成',
        imageurl: '/image/me4.jpg'
      }
    ],
  },
  //事件处理函数
  toOrder: function (e) {
    wx.navigateTo({
      url: '../bill/bill?typeid='+e.target.dataset.typeid
    })
  },
  calling:function(){
    wx.makePhoneCall({
      phoneNumber: '18560186018', //此号码并非真实电话号码，仅用于测试
      success:function(){
        console.log("拨打电话成功！")
      },
      fail:function(){
        console.log("拨打电话失败！")
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onLoad(){
    var self = this;
    /**
     * 获取用户信息
     */
    wx.getUserInfo({
      success: function(res){
        self.setData({
          thumb: res.userInfo.avatarUrl,
          nickname: res.userInfo.nickName
        })
      }
    })
  },
  onShow(){
    const that = this;

    wx.request({
      url: Config.basePath + 'defaddress&openid=' + App.globalData.openid,
      success: function (data) {
        if (data.data.meta.code == 0) {
          that.setData({
            address: data.data.data,
            hasAddress: true
          })
        }
      }
    })

  }
})