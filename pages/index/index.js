const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsClassify: {
      gn: '国内',
      gj: '国际',
      cj: '财经',
      yl: '娱乐',
      js: '军事',
      ty: '体育',
      other: '其他'
    },

    hotNews: {},
    newsList: {},
    currentClassify: 'gn'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getNewsList(this.data.currentClassify)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getNewsList(this.data.currentClassify, wx.stopPullDownRefresh)
  },

  /**
   * 切换新闻分类
   */
  OnSwitchClassify: function(e) {
    let classify = e.currentTarget.dataset.classify
    this.setData({
      currentClassify: classify
    })
    this.getNewsList(classify)
  },

  /**
   * 调整详情
   */
  OnBrowseDetail: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  /**
   * 获取新闻列表
   */
  getNewsList: function(classify, callback) {
    let domain = app.globalData.domain
    let api = domain + '/api/news/list'
    wx.request({
      url: api,
      data: {
        type: classify
      },
      success: res => {
        let list = res.data.result
        let hotNews = list.slice(0, 1)[0]
        hotNews.date = hotNews.date.substr(11, 5)
        let newsList = list.slice(1, 8)
        newsList.forEach(function(item) {
          item.date = item.date.substr(11, 5)
        })

        this.setData({
          hotNews: hotNews,
          newsList: newsList
        })
      },
      complete: res => {
        callback && callback()
      }
    })
  }
})