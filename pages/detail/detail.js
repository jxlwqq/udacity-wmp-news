// pages/detail/detail.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    let domain = app.globalData.domain
    let api = domain + '/api/news/detail'
    wx.request({
      url: api,
      data: {
        id: id
      },
      success: res => {
        let news = res.data.result
        news.date = news.date.substr(5, 5) + ' ' + news.date.substr(11, 5)
        this.setData({
          news: news
        })
      }
    })
  }
})