module.exports = {
  apps: [{
    name: 'N1-HQTCSDL',
    script: 'yarn start',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
