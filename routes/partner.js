const express = require('express')
const router = express.Router()

router.get('/register', function (req, res, next) {
  res.render('partner/register')
})

router.get('/contract', function (req, res, next) {
  res.render('partner/contract')
})

module.exports = router
