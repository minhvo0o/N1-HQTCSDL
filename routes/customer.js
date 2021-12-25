const express = require('express')
const res = require('express/lib/response')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('customer/index')
})

router.get('/editInfo', function (req, res, next) {
  res.render('customer/edit-info')
})

router.get('/orderStatus', function (req, res, next) {
  res.render('customer/order-status')
})

router.get('/order', function (req, res, next) {
  res.render('customer/order')
})

module.exports = router
