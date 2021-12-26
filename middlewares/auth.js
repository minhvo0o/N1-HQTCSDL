const _ = require('lodash')
const { COOKIE_USERNAME, COOKIE_PASSWORD, COOKIE_ROLE } = require('../constants')

const getUserFromCookies = (cookies) => {
  const role = _.get(cookies, COOKIE_ROLE)
  const username = _.get(cookies, COOKIE_USERNAME)
  const password = _.get(cookies, COOKIE_PASSWORD)

  let user
  if (!role || !username || !password) {
    user = null
  } else {
    user = { role, username, password }
  }

  return user
}

const apply = () => (req, res, next) => {
  const user = getUserFromCookies(req.cookies)
  req.user = user
  next()
}

const requiredLogin = (req, res, next) => {
  const user = getUserFromCookies(req.cookies)

  if (!user) {
    return res.redirect('/auth/login')
  }

  req.user = user

  return next()
}

const notRequiredLogin = (req, res, next) => {
  const user = getUserFromCookies(req.cookies)

  if (!user) {
    return next()
  }

  return res.redirect('/')
}

const requiredRole = (role) => (req, res, next) => {
  const user = getUserFromCookies(req.cookies)

  if (role === user.role) {
    return next()
  }

  return res.redirect('/')
}

module.exports = {
  requiredLogin,
  notRequiredLogin,
  requiredRole,
  apply
}
