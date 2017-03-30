//index.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    scanResult: '',
    filePath: ''
  },

  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },
  scan: function () {
    var that = this;
    wx.scanCode({
      success: (res) => {
        that.setData({ scanResult: res.result });
      }
    })
  },
  startRec: function () {
    var that = this;
    wx.startRecord({
      success: function (res) {
        that.setData({ filePath: res.tempFilePath });
        // that.audioCtx = wx.createAudioContext('myAudio')
        // that.audioCtx.play();
        wx.playVoice({
          filePath: res.tempFilePath,
          complete: function () {
          }
        })
      },
      fail: function (res) {
        //录音失败
        wx.showToast({
          title: 'fail',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },
  stopRec: function () {
    wx.stopRecord()
  }
})
