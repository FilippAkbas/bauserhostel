const express = require('express')
const createPath = require('../helpers/creater-path')

const router = express.Router()

router.get('/', (req, res) => {
  const title = 'Home Page';
  res.render(createPath('index'), {title});
})

router.get('/special', (req, res) => {
  const title = 'Special';
  res.render(createPath('special'), {title});
})

router.get('/account', (req, res) => {
  const title = 'Account';
  res.render(createPath('account'), {title});
})

router.get('/about-us', (req, res) => {
  const title = 'About Us';
  res.render(createPath('about-us'), {title});
})

router.get('/contact', (req, res) => {
  const title = 'Contact';
  res.render(createPath('contact'), {title});
})

router.get('/add-reserve', (req, res) => {
  const title = 'Reserve';
  res.render(createPath('add-reserve'), {title});
})


module.exports = router