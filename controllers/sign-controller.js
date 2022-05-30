const User = require('../models/user')
const createPath = require('../helpers/creater-path')

const catchError = (req, res) => {
  console.log(error)
  res.render(createPath('error'), { title: 'Error' })
}

const userLogin = (req, res) => {
  const title = 'Account'
  const { email, password } = req.body
  const user = User.findOne({email})

  if(!user) {
    res.render(createPath('registration'), { title })
  } else {
    res.render(createPath('account'), { title })
  }
}

const userRegistration = (req, res) => {
  const { email, password } = req.body
  const user = new User({ email, password })
  user
    .save()
    .then((result) => res.redirect('/login'))
    .catch((error) => catchError(res, error))
}

module.exports = {
  userRegistration,
  userLogin
}