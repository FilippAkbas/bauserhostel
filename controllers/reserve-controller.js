const Reserve = require('../models/reserve')
const createPath = require('../helpers/creater-path')

const catchError = (req, res) => {
  console.log(error)
  res.render(createPath('error'), { title: 'Error' });
}

const getReserve = (req, res) => {
  const title = 'Reserve'
  Reserve
    .findById(req.params.id)
    .then((reserve) => res.render(createPath('reserve'), { reserve, title }))
    .catch((error) => catchError(res, error))
}

const getAllReserve = (req, res) => {
  const title = 'Reserve'
  Reserve
    .find()
    .then((reserves) => res.render(createPath('reserves'), { reserves, title }))
    .catch((error) => catchError(res, error))
}

const addReserve = (req, res) => {
  const { fullname, phone, pasaportId, pasaportDate } = req.body
  const reserve = new Reserve({fullname, phone, pasaportId, pasaportDate})
  reserve
    .save()
    .then((result) => res.redirect('/reserves'))
    .catch((error) => catchError(res, error)) 
}

module.exports = {
  getReserve,
  getAllReserve,
  addReserve
}