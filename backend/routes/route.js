import express from 'express';
import {createBook, getAllBooks, getBook, editBook, deleteBook} from '../controller/book-controller.js'

const router = express.Router();

router.post('/books/create', createBook)
router.get('/books', getAllBooks)
router.get('/books/detail/:id', getBook)
router.put('/books/edit/:id', editBook)
router.delete('/books/delete/:id', deleteBook)
export default router;