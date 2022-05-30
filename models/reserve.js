const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reserveSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  pasaportId: {
    type: String,
    required: true,
  },
  pasaportDate: {
    type: String,
    required: true,
  }
})


const Reserve = mongoose.model('Reserve', reserveSchema)

module.exports = Reserve