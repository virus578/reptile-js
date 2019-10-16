'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://172.19.23.111:7002"',
  // BASE_API: '"http://172.18.8.184:7002"',
    BASE_API: '"http://113.106.75.135:7002"',
})
