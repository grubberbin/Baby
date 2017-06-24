// pages/settings/settings.js

var member = [
   {"id":"亲情号码1","number":""},
   {"id":"亲情号码2","number":""},
   {"id":"亲情号码3","number":""},
   {"id":"亲情号码4","number":""},
   {"id":"亲情号码5","number":""}
];
var writeList =[
   {"id":"白名单1","number":""},
   {"id":"白名单2","number":""},
   {"id":"白名单3","number":""},
   {"id":"白名单4","number":""},
   {"id":"白名单5","number":""},
   ];

   
Page({
  data:{
    pageId:"",
  },

  saveNum:function(){

    
  },


  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.id)
    this.setData({pageId : options.id});
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})