const express = require('express')
const router = express.Router()

router.get('/register', function (req, res, next) {
  res.render('partner/register')
})

router.get('/contract', function (req, res, next) {
  res.render('partner/contract')
})

router.get('/manage-product', function (req, res) {
  res.render('partner/manage-product')
})

router.get('/manage-order', function (req, res) {
  res.render('partner/manage-order')
})

module.exports = router
