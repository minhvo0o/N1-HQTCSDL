const express = require('express')
const router = express.Router()
// const { Request } = require('tedious')
const { EmployeeModel, PartnerModel } = require('../models')

// const { connection } = con

// router.get('/without-async-await', function (req, res, next) {
//   const request = new Request(
//     'SELECT * FROM NhanVien',
//     (err, rowCount, rows) => {
//       if (err) {
//         console.log(err)
//       }
//     }
//   )

//   const data = []

//   request.on('row', columns => {
//     const obj = {}

//     columns.forEach(column => {
//       obj[column.metadata.colName] = column.value
//     })

//     data.push(obj)
//   })

//   request.on('requestCompleted', function () {
//     connection.close()
//     console.log('data', data)
//     res.render('employee/index', { list: data })
//   })

//   connection.execSql(request)
//   con.employeeList2()
//     .then((rows) => {
//       console.log('rows', rows)
//     })
//     .catch((err) => {
//       console.log(err.message)
//     })
// })

router.get('/', async (req, res, next) => {
  try {
    const employees = await EmployeeModel.getEmployees()
    res.render('employee/index', { list: employees })
  } catch (err) {
    res.send('Error ' + err.message)
  }
})

router.get('/contracts', async (req, res, next) => {
  try {
    const contracts = await EmployeeModel.getContracts()
    res.render('employee/contracts', { list: contracts })
  } catch (err) {
    res.send('Error ' + err.message)
  }
})

router.get('/manage-partner', async (req, res, next) => {
  try {
    const partners = await PartnerModel.getPartners()
    res.render('employee/manage-partner', { partners })
  } catch (err) {
    res.send('Error ' + err.message)
  }
})

router.get('/contract-detail', async (req, res, next) => {
  res.render('employee/contract-detail')
})

module.exports = router
