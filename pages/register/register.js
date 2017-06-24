//register.js
var Bmob = require('../../utils/bmob.js');
var common = require('../../utils/common.js');

Page({
  data: {
    userName: '',
    oldpawd: '',
    password1: '',
    password2: '',
    mode: '',// register/reset/modify
    time: 60,
    verifySmsCode: ''
  },

  // 获取用户名
  userName: function (e) {
    this.setData({ userName: e.detail.value });
  },

  //获取旧密码
  oldpawd: function (e) {
    this.setData({ oldpawd: e.detail.value });
  },

  //获取密码1
  password1: function (e) {
    this.setData({ password1: e.detail.value });
  },

  //获取密码2
  password2: function (e) {
    this.setData({ password2: e.detail.value });
  },

  //验证码
  verifySmsCode: function (e) {
    this.setData({ verifySmsCode: e.detail.value });
  },

  //页面加载的函数
  onLoad: function (options) {
    this.setData({ mode: options.mode });
  },


  //注册//重置密码
  register: function (event) {

    //验证码校验
    var that = this;
    var phone = that.data.userName;
    var verifyCode = that.data.verifySmsCode;
    var phone1 = Number(phone);

    if (!phone || isNaN(phone1) || phone.length != 11) {
      common.showModal('请填写正确的手机号码！');
      return false;
    } else if (that.data.password1 != that.data.password2) {
      common.showModal("两次输入的密码不同,请重新输入！");
      return false;
    } else if (that.data.password1 == "" || that.data.password2 == "") {
      common.showModal("密码不能为空！");
      return false;
    } else if (!verifyCode) {
      common.showModal('请输入验证码');
      return false;
    } else {
      Bmob.Sms.verifySmsCode(phone, verifyCode).then(function (obj) {
        common.showTip('验证成功' + "smsId:" + obj.msg);
        console.log(obj.msg)

        // 发送注册信息
        var user = new Bmob.User();
        user.set("username", that.data.userName);
        user.set("password", that.data.password1);
        user.signUp(null, {
          success: function (res) {
            common.showTip("注册成功请登录", "success", function () {
              wx.redirectTo({
                url: "../baby/baby"
              })
            });

          },
          error: function (userData, error) {
            if (error.code == 202) {
              common.showModal("该用户已存在！");
            }
          },
          complete: function (userData) {
          }

        });


      }, function (err) {
        console.log(err)
        if (err.code == 207) {
          console.log("验证码错误啊")
          common.showModal('验证码错误！');
          return false;
        }
      })
    };


  },

  gainMsg: function gainMsg() {
    var $this = this;
    var currentTime = $this.data.time;
    var mobile = $this.data.userName;
    var mobile1 = Number(mobile);
    if (!mobile || isNaN(mobile1) || mobile.length != 11) {
      common.showModal('请填写正确的手机号码');
    } else {

      if (currentTime == 60) {
        (function () {
          var countDown = setInterval(function () {
            $this.setData({
              time: $this.data.time - 1

            });
            if ($this.data.time == 0) {
              console.log($this.data.time);
              clearInterval(countDown);
              $this.setData({
                time: 60
              });
            }
          }, 1000);

          //发送验证码
          Bmob.Sms.requestSmsCode({ "mobilePhoneNumber": mobile }).then(function (obj) {
            $this.setData({
              userName: mobile
            })
            common.showTip('发送成功' + "smsId:" + obj.smsId);
          }, function (err) {
            common.showTip('发送失败' + err);
          });

        })();
      }
    }
  },

})