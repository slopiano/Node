const express = require('express');
const router = express.Router()

const {getAllBooks, createBooks, getSingle, updateBook, deleteBook} = require('./tasks')

router.route('/').get(getAllBooks).post(createBooks)
router.route('/:id').get(getSingle).patch(updateBook).delete(deleteBook)

module.exports = router