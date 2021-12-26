const express = require('express')
const { CustomerModel, PartnerModel, ProductModel } = require('../models')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('customer/index')
})

router.get('/edit-info', function (req, res, next) {
  res.render('customer/edit-info')
})

router.get('/order-status', async (req, res, next) => {
  const orders = await CustomerModel.getOrders()
  res.render('customer/order-status', { list: orders })
})

router.get('/order', async (req, res, next) => {
  const partners = await PartnerModel.getPartners()
  const products = await ProductModel.getProducts()
  res.render('customer/order', { partnerList: partners, productList: products })
})

module.exports = router
