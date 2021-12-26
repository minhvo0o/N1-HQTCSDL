const express = require('express')
const { CustomerModel, ProductModel } = require('../models')
const router = express.Router()

router.get('/', function (req, res, next) {
  res.render('customer/index')
})

router.get('/create-order', async (req, res) => {
  const customers = await CustomerModel.getCustomers()
  res.render('customer/create-order', {
    customers
  })
})

router.post('/create-order', async (req, res) => {
  // const body = {
  //   MaKH: '',
  //   HinhThucTT: '',
  //   DiaChiGiaoHang: '',
  //   NgayDatHang: ''
  // }

  try {
    await CustomerModel.createOrder({
      ...req.body,
      NgayDatHang: new Date()
    })
    res.json({
      success: 'Thêm đơn hàng thành công',
      note: 'Chuyển sang trang danh sách đơn hàng'
    })
  } catch (err) {
    res.json({
      error: err.message
    })
  }
})

router.get('/create-order-details/:MaDH', async (req, res) => {
  const { MaDH } = req.params
  const customers = await CustomerModel.getCustomers()
  const products = await ProductModel.getProducts()

  res.render('customer/create-order-details', {
    MaDH,
    customers,
    products
  })
})

router.post('/create-order-details/:MaDH', async (req, res) => {
  // const body = {
  //   MaSP: 'SP00002',
  //   SoLuong: 1,
  //   MaDH: 'DH00015'
  // }

  const { MaDH } = req.params

  const customers = await CustomerModel.getCustomers()
  const products = await ProductModel.getProducts()

  try {
    await CustomerModel.createOrderDetails({
      ...req.body,
      MaDH
    })

    res.render('customer/create-order-details', {
      MaDH,
      customers,
      products,

      success: 'Thêm sản phẩm thành công'
    })
  } catch (err) {
    res.render('customer/create-order-details', {
      MaDH,
      customers,
      products,

      error: err.message
    })
  }
})

router.get('/edit-info', function (req, res, next) {
  res.render('customer/edit-info')
})

router.get('/order-status', async (req, res, next) => {
  const orders = await CustomerModel.getOrders()
  res.render('customer/order-status', { list: orders })
})

module.exports = router
