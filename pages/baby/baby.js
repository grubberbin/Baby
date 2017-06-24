//baby.js
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');

var qqmap = new QQMapWX({
  key: 'IPLBZ-6VA33-7NC3Y-3OFYD-UGVEZ-VAFEB'
});
var loc_lat;
var loc_lng;


Page({
  data: {

    //地图的宽高
    mapHeight: '100%',
    mapWidth: '88%',
    mapTop: '0',

    //用户当前位置
    point: {
      latitude: 0,
      longitude: 0,
    },

    //设备电量
    batinfo: 5,

    //定位标注物
    markers: [],

    //当前地图的缩放级别
    mapScale: 18,

    //当前位置信息显示
    address: '',

    //地图上不可移动的控件
    controls: [
      //地图中心位置按钮{}
      /*
         {
           id: 10,
           position: {
              left:177.5*wx.getStorageSync("kScreenW"),
              top:265.5*wx.getStorageSync("kScreenH"),
              width:40*wx.getStorageSync("kScreenW"),
              height:40*wx.getStorageSync("kScreenW")
        },
           iconPath: '../../images/location.png',
           clickable: false,
        },
        */
      {
        id: 11,
        position: {
          left: 310 * wx.getStorageSync("kScreenW"),
          top: 60 * wx.getStorageSync("kScreenH"),
          width: 50 * wx.getStorageSync("kScreenW"),
          height: 50 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../../images/locate.png',
        clickable: true,
      },
      {
        id: 12,
        position: {
          left: 320 * wx.getStorageSync("kScreenW"),
          top: 120 * wx.getStorageSync("kScreenH"),
          width: 50 * wx.getStorageSync("kScreenW"),
          height: 50 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../../images/track.png',
        clickable: true,
      },
      {
        id: 13,
        position: {
          left: 300 * wx.getStorageSync("kScreenW"),
          top: 440 * wx.getStorageSync("kScreenH"),
          width: 50 * wx.getStorageSync("kScreenW"),
          height: 50 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../../images/other.png',
        clickable: true,
      },
    ]

  },

  //定位到用户当前位置
  getUserCurrentLocation: function () {
    this.mapCtx.moveToLocation();
    this.setData({
      'mapScale': 16
    })
  },

  //控件的点击事件
  controltap: function (e) {
    console.log(e)
    var that = this
    var id = e.controlId
    console.log(e.controlId)
    if (id == 10) {
      //定位当前位置
      that.getUserCurrentLocation()
      //  console.log('onLoad')
      console.log('定位当前位置');
    }
    else if (id == 11) {
      common.showTip("发送定位请求到后台！", "success", function () {
        Bmob.Cloud.run('receiveAppData', { "typeInfo": "onceLocation" }, {
          success: function (result) {
            console.log(result);
            var latitude = JSON.parse(result).latitude;
            var longitude = JSON.parse(result).longitude;
            var loc_lat = Number(latitude)
            var loc_lng = Number(longitude)
            console.log(latitude);
            var markers = []
            var marker = [{
              iconPath: "../../images/location.png",
              id: 0,
              latitude: loc_lat,
              longitude: loc_lng,
              width: 50,
              height: 50
            }]
            markers.push(marker)
            //标注后地图上没有标记
            that.setData({
              'markers': markers
            })
            console.log(that.data.markers)
          },
          error: function (error) {
            console.log(error);
          }
        })
      })

    } else if (id == 12) {
      common.showTip("发送查询轨迹请求到后台！", "success", function () {
        Bmob.Cloud.run('receiveDeviceData', { "typeInfo": "findTrackLog" }, {
          success: function (result) {
            console.log(result);
          },
          error: function (error) {
            console.log(error);
          }
        })
      });
    } else if (id == 13) {
      console.log('跳转到设置界面！')
      wx.navigateTo({
        url: '../babyinfo/babyinfo'
      })
    }


  },


  //页面加载的函数
  onLoad: function () {
    console.log('onLoad')
    var that = this

    //获取用户的当前位置位置
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用wx.openLocation 的坐标
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var point = {
          latitude: latitude,
          longitude: longitude
        };
        that.setData({
          'point': point
        })
      }
    });
  
  },

  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
    console.log("onReady")
  },

  onShow: function (e) {
    var that = this
    console.log("onshow")
    console.log(loc_lat)
    console.log(loc_lng)
    if (loc_lat != 0 && loc_lng != 0) {
      qqmap.reverseGeocoder({
        location: {
          latitude: loc_lat,
          longitude: loc_lng
        },
        success: function (res) {
          var province = res.result.ad_info.province;
          var partAddr = res.result.formatted_addresses.recommend;
          var Addr = province + partAddr;

          that.setData({
            'address': Addr
          })
        },
        fail: function (res) {
          console.log(res);
        }
      })
    }
  },


  //请求定位轨迹
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})