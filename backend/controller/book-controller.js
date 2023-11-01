import Book from '../model/bookSchema.js'

export const createBook = async(request, response) =>{
    try{
        const book = await new Book(request.body);
        book.save();
        console.log();
        response.status(200).json('Book data saved successfully.')
    }catch(error){
        response.status(500).json(error)
    }
}

export const getAllBooks = async (request, response) => {
    try {
        
        const book = await Book.find({});
        response.status(200).json(book);
    } catch (error) {
        response.status(404).send("Error in fetching books:", error);
    }

}

export const getBook = async (request, response) => {
    try {
        const book = await Book.findById(request.params.id);
        response.status(200).json(book);
    } catch (error) {
        response.status(404).send("Error in fetching books:", error);
    }

}
export const editBook = async (request, response) => {
    try {
        const book = await Book.findById(request.params.id);

        console.log(book);
        if (!book) return response.status(404).send("No such book exists");

        await Book.findByIdAndUpdate( request.params.id, { $set: request.body })
        response.status(200).json('Book updated successfully');

    } catch (error) {
        response.status(404).send("Error in fetching books:", error);
    }

}



export const deleteBook = async (request, response) => {
    try {
        const book = await Book.findById(request.params.id);
        if (!book) return response.status(404).send("No such book exists");
        await book.deleteOne()

        response.status(200).json('Book deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}