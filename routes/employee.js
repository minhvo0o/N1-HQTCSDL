const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('employee/index')
})

router.get('/contractDetail', function (req, res, next) {
  res.render('employee/contractDetail')
})

module.exports = router
