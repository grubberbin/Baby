//index.js
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    userListHidden:true,
    iconType: 'success',
    userName:'',
    password:'',
    userNames:[],
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  // 获取用户名
  userName:function(e){
    this.setData({userName :e.detail.value});
  },

  //点击向下的图标
  clickImage:function(){
    var array = wx.getStorageSync('userNames');
    this.setData({userNames : array});
    this.setData({userListHidden :!this.data.userListHidden})
  },
  //获取密码
  password:function(e){
    this.setData({password :e.detail.value});
  },

  //登录
  login:function(){
    if(this.data.userName ==''||this.data.password =='')
    return;
    /*
    //获取缓存
    var array = wx.getStorageSync('userNames') || [];

    for(var i=0;i<array.length;i++){
        if(array[i]== this.data.userName)
        break;
    }
    array.unshift(this.data.userName);
    wx.setStorageSync('userNames', array);
    //wx.setStorageSync('password', this.data.password);
    */
    console.log("点击登录:");
   // console.log(this.data.userName);
   // console.log(this.data.password);

    //登录
    Bmob.User.logIn(this.data.userName,this.data.password,{
      success :function(user){
        wx.getStorage({
          key: Bmob._getBmobPath(Bmob.User._CURRENT_USER_KEY),
          success: function(res){
            var Data =JSON.parse(res.data);
            //console.log(Data)
            common.showTip("登录成功，正在跳转","success",function(){wx.redirectTo({
                url: '../baby/baby', 
              })
            });

            }
          })
        },
        error:function (user,error){
          console.log(error)
          common.showTip("对不起，您输入的用户名或密码错误","loading");
        }
    })
  },

  //勾选 服务条款
  clickIcon:function(){
    if(this.data.iconType =='success'){
        this.setData({iconType:'circle'})
    }
    else{
      this.setData({iconType:'success'})
      }
  },
  //选定缓存的账号
  clickCell:function(e){
    this.setData({userName:this.data.userNames[e.currentTarget.id]});
    console.log(this.data.userNames[e.currentTarget.id]);
    //清空密码
    this.setData({password:''});
  },

   //注册 
  clickRegister:function(){
      wx.navigateTo({
        url: '../register/register?mode=register'
      })
     console.log("跳转注册登录界面..."); 
  },
  //找回密码
  clickFindPassword:function(){
      wx.navigateTo({
        url: '../register/register?mode=reset'
      })
     console.log("跳转注册登录界面..."); 
  },

  //服务条款界面
  serviceTip:function(){
     wx.navigateTo({
        url: '../service/service'
      })
     console.log("跳转服务条款界面..."); 
  },

    onShareAppMessage: function() {
    // 用户点击右上角分享
    console.log('onShareAppMessage'); 
    return {
      desc: '我刚刚发现了一款儿童智能监护神器,快来看看吧!', // 分享描述
      path: '../index/index' // 分享路径
    }}

})
