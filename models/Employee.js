const { Request } = require('tedious')
const { databaseUtil } = require('../utils')

const { connection } = databaseUtil

const getEmployees = function queryDatabase () {
  return new Promise((resolve, reject) => {
    // Read all rows from table
    const request = new Request(
      'SELECT * FROM NhanVien',
      (err, rowCount, rows) => {
        if (err) {
          reject(err)
        }
      }
    )

    const data = []

    request.on('row', columns => {
      const obj = {}

      columns.forEach(column => {
        obj[column.metadata.colName] = column.value
      })

      data.push(obj)
    })

    request.on('requestCompleted', function () {
      connection.close()
      resolve(data)
    })

    connection.execSql(request)
  })
}

module.exports = {
  getEmployees
}
