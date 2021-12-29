const express = require('express')
const { CustomerModel, ProductModel } = require('../models')
const router = express.Router()

router.get('/manage-order', async (req, res, next) => {
  const orders = await CustomerModel.getOrders2()
  res.render('customer/manage-order', { orders: orders })
})

router.get('/order-details/:MaDH', async (req, res, next) => {
  try {
    const { MaDH } = req.params
    const order = await CustomerModel.getOrder(MaDH)

    if (!order) {
      throw new Error('Đơn hàng không tồn tại')
    }

    const orderDetails = await CustomerModel.getOrderDetails(MaDH)
    const orderTransports = await CustomerModel.getOrderTransports(MaDH)

    res.render('customer/order-details', { order, orderDetails, orderTransports })
  } catch (error) {
    next(error)
  }
})

router.get('/create-order', async (req, res) => {
  const customers = await CustomerModel.getCustomers()
  res.render('customer/create-order', {
    customers
  })
})

router.post('/create-order', async (req, res, next) => {
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
    res.redirect('/customer/manage-order')
  } catch (err) {
    next(err)
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
  res.render('customer/order-status', { orders: orders })
})

module.exports = router
