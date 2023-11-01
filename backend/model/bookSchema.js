import mongoose from "mongoose";

const bookSchema = ({
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishYear: {type: Number}
})

const Book = mongoose.model('book', bookSchema);
export default Book;