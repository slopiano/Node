const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const MySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must include title"],
    trim: true,
    maxlength: [40, 'cannot be longer than 40 characters']
  },
  author: {
    type: String,
    required: [true, "must include author"],
    trim: true,
    maxlength: [30, 'cannot be longer than 30 characters']
  },
  genre: {
    type: String,
    default: "Fiction"
  },
  price: {
    type: Number,
    required: [true, "must include price"],
  },
  url: {
    type: String,
    default: 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'
  },
})

module.exports = mongoose.model('Schema', MySchema)