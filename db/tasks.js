const { BookModel, UserModel } = require('./Schema');

const getAllBooks = async (req,res) =>{
    try {
        const schema = await BookModel.find({})
        res.status(200).json({schema})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createBooks = async (req,res) =>{
    try {
        const schema = await BookModel.create(req.body)
        res.status(201).json({schema})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const getSingle = async (req,res) =>{
    try {
        const {id:bookID} = req.params
        const schema = await BookModel.findOne({_id:bookID})
        if(!schema){
            return res.status(404).json({msg: `No book : ${bookID}`})
        }
        res.status(200).json({schema})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const updateBook = async (req,res) =>{
    try {
        const {id:bookID} = req.params
        const schema = await BookModel.findOneAndUpdate({_id:bookID},req.body,{
            new: true,
            runValidators: true,
        })
        if(!schema){
            return res.status(404).json({msg: `No book : ${bookID}`})
        }
        res.status(200).json({schema})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const deleteBook = async (req,res) =>{
    try {
        const {id:bookID} = req.params
        const schema = await BookModel.findOneAndDelete({_id:bookID})
        if(!schema){
            return res.status(404).json({msg: `No book : ${bookID}`})
        }
        res.status(200).json({schema})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const createUser = async (req,res) =>{
    try {
        const schema = await BookModel.create(req.body)
        res.status(201).json({schema})
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

module.exports = {
    getAllBooks,
    createBooks,
    getSingle,
    updateBook,
    deleteBook,
    createUser
}
