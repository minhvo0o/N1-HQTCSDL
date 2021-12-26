const { Connection } = require('tedious')
const config = require('../config')

const connect = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    const connectionConfig = {
      authentication: {
        options: {
          userName: username,
          password: password
        },
        type: 'default'
      },
      server: 'studee.database.windows.net',
      options: {
        database: 'HQT_CSDL_N1',
        encrypt: true
      }
    }

    const connection = new Connection(connectionConfig)

    connection.on('connect', err => {
      if (err) {
        console.error('Database', username, err.message)
        reject(err)
      } else {
        console.log('Database', username, 'connected!')
        resolve(connection)
      }
    })

    connection.on('end', () => {
      console.log('Database', username, 'ended!')
    })

    connection.connect()
  })
}

// Create connection to database
const connectionConfig = {
  authentication: {
    options: {
      userName: config.AZURE_USERNAME, // update me
      password: config.AZURE_PASSWORD // update me
    },
    type: 'default'
  },
  server: 'studee.database.windows.net', // update me
  options: {
    database: 'HQT_CSDL_N1', // update me
    encrypt: true
  }
}

const connection = new Connection(connectionConfig)

module.exports = {
  connect,
  connection
}
