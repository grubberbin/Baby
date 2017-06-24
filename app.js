//app.js
var Bmob = require('utils/bmob.js')
Bmob.initialize("25d8138a2af67de7caff1a6891da8999", "820d46794c10063278e0d812bffd5a3a");

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //调用系统API获取设备的信息
    wx.getSystemInfo({
      success: function(res) {
        var kScreenW = res.windowWidth/375
        var kScreenH = res.windowHeight/603
        wx.setStorageSync('kScreenW', kScreenW)
        wx.setStorageSync('kScreenH', kScreenH)
      }
    })
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
})