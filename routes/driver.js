const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.send('Driver')
})

router.get('/register', function (req, res, next) {
  res.render('driver/register')
})

router.get('/manage-order', function (req, res) {
  res.render('driver/manage-order')
})

router.get('/manage-income', function (req, res) {
  res.render('driver/manage-income')
})

module.exports = router
