Page({
  data: {
    Height: 0,
    scale: 13,
    longitude: 117.06974,
    latitude: 36.689907,
    markers: [],
    controls: [{
      id: 1,
      iconPath: '/image/jian.jpg',
      position: {
        left: 320,
        top: 100 - 50,
        width: 20,
        height: 20
      },
      clickable: true
    },
    {
      id: 2,
      iconPath: '/image/jia.jpg',
      position: {       
        left: 340,
        top: 100 - 50,
        width: 20,
        height: 20
      },
      clickable: true
    }
    ],
    circles: []

  },

  onLoad: function () {
    var _this = this;

    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }

        })
      }
    })
    // wx.getLocation({
    //   type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
    //   success: function (res) {
    //     console.log(res)
    //     36.651216
    //     longitude
    //     :
    //     117.12
    //   }
    // })
        _this.setData({
          markers: [{
            id: "1",
            latitude: 36.689907,
            longitude: 117.06974,
            width: 20,
            height: 25,
            iconPath: "/image/my.png",
            title: "海威大厦"
          }],
          
        })
  },

  regionchange(e) {
    console.log("regionchange===" + e.type)
  },

  //点击merkers
  markertap(e) {
    console.log(e.markerId)

    wx.showActionSheet({
      itemList: ["山东省济南市历城区花园路101号海威大厦"],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  //点击缩放按钮动态请求数据
  controltap(e) {
    var that = this;
    console.log("scale===" + this.data.scale)
    if (e.controlId === 1) {
      // if (this.data.scale === 13) {
      that.setData({
        scale: --this.data.scale
      })
      // }
    } else {
      //  if (this.data.scale !== 13) {
      that.setData({
        scale: ++this.data.scale
      })
      // }
    }


  },


})