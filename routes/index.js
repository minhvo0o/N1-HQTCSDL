const adminRouter = require('./admin')
const authRouter = require('./auth')
const customerRouter = require('./customer')
const driverRouter = require('./driver')
const employeeRouter = require('./employee')
const homeRouter = require('./home')
const partnerRouter = require('./partner')

module.exports = {
  adminRouter,
  authRouter,
  customerRouter,
  driverRouter,
  employeeRouter,
  homeRouter,
  partnerRouter
}
