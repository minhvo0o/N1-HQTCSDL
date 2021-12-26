const express = require('express')
const router = express.Router()
const { PartnerModel, ProductModel, CustomerModel, EmployeeModel } = require('../models')

router.get('/register', (req, res, next) => {
  // const defaultValues = {
  //   MSTDoiTac: 10,
  //   TenDoiTac: 'NCDAi Studio',
  //   NguoiDaiDien: 'Nguyễn Chánh Đại',
  //   ThanhPho: 'Cần Thơ',
  //   Quan: 'Thốt Nốt',
  //   SoChiNhanh: 1,
  //   DonMoiNgay: 100,
  //   LoaiHang: 'Phần mềm',
  //   DiaChiKinhDoanh: 'Thuận Hưng, Thốt Nốt, Cần Thơ',
  //   DienThoaiDT: '0777888148',
  //   Email: 'ncdai@ncdai.vn'
  // }
  res.render('partner/register')
})

router.post('/register', async (req, res) => {
  try {
    await PartnerModel.createPartner(req.body)
    res.render('partner/register', {
      defaultValues: req.body,
      success: 'Đăng kí thông tin đối tác thành công'
    })
  } catch (err) {
    res.render('partner/register', {
      defaultValues: req.body,
      error: err.message
    })
  }
})

router.get('/contract', async (req, res, next) => {
  const partners = await PartnerModel.getPartners()
  const employees = await EmployeeModel.getEmployees()

  res.render('partner/contract', {
    partners,
    employees
  })
})

router.post('/contract', async (req, res) => {
  let partners = []
  let employees = []

  try {
    partners = await PartnerModel.getPartners()
    employees = await EmployeeModel.getEmployees()

    await PartnerModel.createContract(req.body)

    res.render('partner/contract', {
      partners,
      employees,
      success: 'Thêm thông tin hợp đồng thành công'
    })
  } catch (err) {
    res.render('partner/contract', {
      partners,
      employees,
      error: err.message
    })
  }
})

router.get('/manage-product', async (req, res, next) => {
  const products = await ProductModel.getProducts()
  res.render('partner/manage-product', { products: products })
})

router.get('/manage-order', async (req, res, next) => {
  const orders = await CustomerModel.getOrders()
  res.render('partner/manage-order', { orders: orders })
})

module.exports = router
