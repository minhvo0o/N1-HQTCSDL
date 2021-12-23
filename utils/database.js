const sql = require('mssql')

// config for your database
const config = {
  user: 'sa',
  password: 'mypassword',
  server: 'localhost',
  database: 'SchoolDB'
}

// connect to your database
const con = sql.connect(config, function (err) {
  if (err) console.log(err)

  // create Request object
  const request = new sql.Request()

  // query to the database and get the records
  request.query('select * from Student', function (err, recordset) {
    if (err) console.log(err)
  })
})

module.exports = con
