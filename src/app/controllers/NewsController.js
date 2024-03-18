class NewsController {
  // [GET] /news
  getNews(req, res) {
    res.send("[GET] /news")
  }

  // [GET] /news/:slug
  getNewsDetail(req, res) {
    res.send('[GET] /news/:slug')
  }
}

module.exports = new NewsController