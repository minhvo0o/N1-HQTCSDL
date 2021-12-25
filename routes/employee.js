const express = require('express')
const router = express.Router()
const con = require('../utils/database')

router.get('/', function (req, res, next) {
  const employeeList = con.employeeList()
  console.log(employeeList)
  res.render('employee/index', { list: employeeList })
})

router.get('/contractDetail', function (req, res, next) {
  res.render('employee/contract-detail')
})

module.exports = router
