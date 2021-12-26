const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const config = require('./config')
const _ = require('lodash')

const {
  adminRouter,
  authRouter,
  customerRouter,
  driverRouter,
  employeeRouter,
  homeRouter,
  partnerRouter
} = require('./routes')
const { authMiddleware } = require('./middlewares')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser(config.SECRET))
app.use(express.static(path.join(__dirname, 'public')))

app.use(authMiddleware.apply())

app.use((req, res, next) => {
  res.locals.currentUser = req?.user || null
  res.locals.isAuthenticated = !_.isEmpty(req.user)
  next()
})

app.use(
  '/auth',
  authRouter
)

app.use(
  '/admin',
  authMiddleware.requiredLogin,
  authMiddleware.requiredRole('Admins'),
  adminRouter
)

app.use(
  '/customer',
  authMiddleware.requiredLogin,
  authMiddleware.requiredRole('KhachHang'),
  customerRouter
)

app.use(
  '/driver',
  authMiddleware.requiredLogin,
  authMiddleware.requiredRole('TaiXe'),
  driverRouter
)

app.use(
  '/employee',
  authMiddleware.requiredLogin,
  authMiddleware.requiredRole('NhanVien'),
  employeeRouter
)

app.use(
  '/partner',
  authMiddleware.requiredLogin,
  authMiddleware.requiredRole('DoiTac'),
  partnerRouter
)

app.use(
  '/',
  authMiddleware.requiredLogin,
  homeRouter
)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error/index')
})

module.exports = app
