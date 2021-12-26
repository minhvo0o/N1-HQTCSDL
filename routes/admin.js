const express = require('express')
const router = express.Router()
const { DriverModel, PartnerModel, CustomerModel, EmployeeModel } = require('../models')

router.get('/', async (req, res, next) => {
  const drivers = await DriverModel.getDrivers()
  const partners = await PartnerModel.getPartners()
  const customers = await CustomerModel.getCustomers()
  const employees = await EmployeeModel.getEmployees()
  res.render('admin/index', { drivers: drivers, partners: partners, customers: customers, employees: employees })
})

module.exports = router
