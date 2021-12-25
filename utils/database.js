const { Connection } = require('tedious')
const config = require('../config')

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

/*
    //Use Azure VM Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        authentication: {
            type: 'azure-active-directory-msi-vm',
        },
        options: {
            database: process.env["db_database"],
            encrypt: true,
            port: 1433
        }
    };

    //Use Azure App Service Managed Identity to connect to the SQL database
    const config = {
        server: process.env["db_server"],
        authentication: {
            type: 'azure-active-directory-msi-app-service',
        },
        options: {
            database: process.env["db_database"],
            encrypt: true,
            port: 1433
        }
    });

*/

const connection = new Connection(connectionConfig)

module.exports = {
  connection
}
