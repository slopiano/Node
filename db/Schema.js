const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const Books = new mongoose.Schema({
  type: {
    type: String,
    //required: [true, "must include type"],
    trim: true,
    maxlength: [40, 'cannot be longer than 40 characters']
  },
  income: {
    type: Boolean,
    //required: [true, "must include author"],
  },
  price: {
    type: Number,
    //required: [true, "must include price"],
  },
  description: {
    type: String,
    default: 'No description'
  },
})

const User = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, "must include title"],
    trim: true,
    maxlength: [40, 'cannot be longer than 40 characters']
  },
  FavoriteAnimal: {
    type: String,
    required: [true, "must include author"],
    trim: true,
    maxlength: [30, 'cannot be longer than 30 characters']
  },
})

const BookModel = mongoose.model('books', Books)
const UserModel = mongoose.model('user', User)

module.exports = {BookModel, UserModel}
