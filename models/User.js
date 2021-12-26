const { Request, TYPES } = require('tedious')
const config = require('../config')
const { databaseUtil } = require('../utils')

const addUser = async (body) => {
  const connection = await databaseUtil.connect({ username: config.AZURE_USERNAME, password: config.AZURE_PASSWORD })

  return new Promise((resolve, reject) => {
    const request = new Request('[dbo].[ThemUser]', (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })

    request.addParameter('USERNAME', TYPES.Char, body.username)
    request.addParameter('PASSWORD', TYPES.Char, body.password)
    request.addParameter('ROLE', TYPES.VarChar, body.role)

    connection.callProcedure(request)
  })
}

module.exports = {
  addUser
}
