// options.js
var common = require('../../utils/common.js');
var Bmob = require('../../utils/bmob.js');

var grids = [
   {"name":"家庭成员","ico":"/member.png","url":"../settings/settings?id=1"},
   {"name":"安全区域","ico":"/safearea.png","url":"../settings/settings?id=2"},
   {"name":"闹钟","ico":"/alarm.png","url":"../settings/settings?id=3"},
   {"name":"静音时段","ico":"/silence.png","url":"../settings/settings?id=4"},
   {"name":"定位时段","ico":"/loc_time.png","url":"../settings/settings?id=5"},
   {"name":"休眠时段","ico":"/sleep_time.png","url":"../settings/settings?id=6"},
   {"name":"远程关机","ico":"/poweroff.png","url":"","click":"PowerOff"},
   {"name":"宝贝信息","ico":"/IDinfo.png","url":"../settings/settings?id=8"},
   {"name":"省电模式","ico":"/flymode.png","url":"../settings/settings?id=9"},
   {"name":"修改密码","ico":"/password.png","url":"../register/register?mode=modify"},
   {"name":"意见反馈","ico":"/feedback.png","url":"../settings/settings?id=11"},
   {"name":"退出登录","ico":"/logout.png","url":"../index/index","click":"logOut"},
   ];

Page({
  data:{
    grids: grids,
  },

  PowerOff:function(){
     common.showTip("终端关机指令已发送!");
  },

  logOut:function(){
    common.showTip("账号已退出登录!");
    user.logOut();
  },

  onLoad:function(options){
    // 生命周期函数--监听页面加载
  
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
  
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
 
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
   
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作

  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
 
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})