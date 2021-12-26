const express = require('express')
const router = express.Router()
const { CustomerModel } = require('../models')

router.get('/register', function (req, res, next) {
  res.render('driver/register')
})

router.get('/manage-order', async (req, res, next) => {
  const orders = await CustomerModel.getOrders()
  res.render('driver/manage-order', { orders: orders })
})

router.get('/manage-income', async (req, res, next) => {
  const orders = await CustomerModel.getOrders()
  res.render('driver/manage-income', { orders: orders })
})

module.exports = router
