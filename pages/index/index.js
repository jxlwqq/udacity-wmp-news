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
    this.getNewsList('gn')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  OnSwitchClassify: function(e) {
    let classify = e.currentTarget.dataset.classify
    this.setData({
      currentClassify: classify
    })
    console.log(this.data.currentClassify)
    this.getNewsList(classify)
  },

  OnBrowseDetail: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

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