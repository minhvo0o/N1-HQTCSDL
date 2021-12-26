const express = require('express')
const router = express.Router()
const { databaseUtil } = require('../utils')
const { COOKIE_USERNAME, COOKIE_PASSWORD, COOKIE_ROLE, cookieOptions } = require('../constants')
const { authMiddleware } = require('../middlewares')
const { UserModel } = require('../models')

router.get('/login', authMiddleware.notRequiredLogin, (req, res, next) => {
  const role = req.query?.role || ''
  res.render('auth/login', {
    role
  })
})

router.post('/login', authMiddleware.notRequiredLogin, async (req, res) => {
  const { role, username, password } = req.body

  try {
    const connection = await databaseUtil.connect({ username, password })

    res.cookie(COOKIE_ROLE, role, cookieOptions)
    res.cookie(COOKIE_USERNAME, username, cookieOptions)
    res.cookie(COOKIE_PASSWORD, password, cookieOptions)

    connection.close()

    res.redirect('/')
  } catch (error) {
    res.clearCookie(COOKIE_USERNAME)
    res.clearCookie(COOKIE_PASSWORD)
    res.clearCookie(COOKIE_ROLE)

    res.render('auth/login', {
      role: role,
      error: error.message
    })
  }
})

router.get('/register', authMiddleware.notRequiredLogin, (req, res, next) => {
  res.render('auth/register')
})

router.post('/register', authMiddleware.notRequiredLogin, (req, res) => {
  const { redirect } = req.body
  res.redirect(redirect)
})

router.get('/register/partner', authMiddleware.notRequiredLogin, (req, res) => {
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
  console.log('req.user', req.user)
  res.render('partner/register')
})

router.get('/register/employee', authMiddleware.notRequiredLogin, (req, res) => {
  res.render('employee/register')
})

router.get('/register/customer', authMiddleware.notRequiredLogin, (req, res) => {
  res.render('customer/register')
})

router.get('/register/driver', authMiddleware.notRequiredLogin, (req, res) => {
  res.render('driver/register')
})

router.get('/logout', (req, res) => {
  res.clearCookie(COOKIE_USERNAME)
  res.clearCookie(COOKIE_PASSWORD)
  res.clearCookie(COOKIE_ROLE)

  res.redirect('/auth/login')
})

router.post('/add-user', async (req, res) => {
  const { username, password, role } = req.body

  console.log(req.body)

  await UserModel.addUser({
    username,
    password,
    role
  })

  res.json(req.body)
})

module.exports = router
