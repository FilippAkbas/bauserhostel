const express = require('express')
const path = require('path')

const createPath = (page) => path.resolve(__dirname, '../public', `${page}.ejs`)

module.exports = createPath