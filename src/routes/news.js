const express = require('express')
const router = express.Router()

const newsController = require('../app/controllers/NewsController')

router.use('/:slug', newsController.getNewsDetail)
router.use('/', newsController.getNews)

module.exports = router