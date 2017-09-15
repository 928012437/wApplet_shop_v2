import Config from 'etc/config'

App({
  onLaunch: function () {
    this.getOpenid()
  },
  onLoad:function(){
  },
  onShow: function () { 
  },
  onHide: function () {
    
  },
  getOpenid() {
    const that = this
    var code = '';
    var thumb = '';
    var nickname = '';
    wx.login({
      success: function (res) {
        if (res.code) {
          code = res.code;
          wx.getUserInfo({
            success: function (res) {

              thumb = res.userInfo.avatarUrl;
              nickname = res.userInfo.nickName;
              wx.request({
                url: Config.basePath + 'getopenid&appid=' + Config.appid + '&secret=' + Config.secret + '&js_code=' + code + '&thumb=' + thumb + '&nickname=' + nickname,
                success: function (res) {
                  that.globalData.openid = res.data.openid
                }
              })

            }
          })

        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    openid:null
  },
})
