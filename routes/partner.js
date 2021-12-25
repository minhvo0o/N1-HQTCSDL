const express = require('express')
const router = express.Router()
const { PartnerModel } = require('../models')

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
      success: 'Đăng kí thông tin đối tác'
    })
  } catch (err) {
    res.render('partner/register', {
      defaultValues: req.body,
      error: err.message
    })
  }
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
