import Config from '../../../etc/config'
const App = getApp()

Page({
  data:{
    address:{}
  },
  onLoad(){
    const that = this;

    wx.request({
      url: Config.basePath + 'defaddress&openid=' + App.globalData.openid,
      success: function (data) {
        if (data.data.meta.code == 0) {
          that.setData({
            address: data.data.data
          })
        }
      }
    })
  },
  formSubmit(){
    var self = this;
    var name = self.data.address.realname;
    var tel = self.data.address.mobile;
    var address = self.data.address.address;
    if (name && tel && address){

      wx.request({
        url: Config.basePath + 'addaddress&openid=' + App.globalData.openid + '&name=' + name + '&tel=' + tel + '&address=' + address,
        success: function (data) {
          if (data.data.meta.code == 0) {
            wx.navigateBack();
          }
        }
      })
      
    }else{
      wx.showModal({
        title:'提示',
        content:'请填写完整资料',
        showCancel:false
      })
    }
  },
  bindName(e){
    this.setData({
      'address.realname' : e.detail.value
    })
  },
  bindPhone(e){
    this.setData({
      'address.mobile' : e.detail.value
    })
  },
  bindDetail(e){
    this.setData({
      'address.address' : e.detail.value
    })
  }
})