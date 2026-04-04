import { useState } from "react"
import type { Book } from "../types/Book"
import { updateBook } from "../api/BooksAPI";

interface EditBookFormProps {
    book: Book;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditBookform = ({book, onSuccess, onCancel}: EditBookFormProps) => {
    const [formData, setformData] = useState<Book>({...book});
        

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setformData({...formData, [e.target.name]: e.target.value})
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(formData.bookID, formData);  
        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <label>Book Title: <input type = "text" name = "title" value={formData.title} onChange={handleChange}></input></label>
            <label>Author: <input type = "text" name = "author" value={formData.author} onChange={handleChange}></input></label>
            <label>Publisher: <input type = "text" name = "publisher" value={formData.publisher} onChange={handleChange}></input></label>
            <label>ISBN: <input type = "text" name = "isbn" value={formData.isbn} onChange={handleChange}></input></label>
            <label>Classification: <input type = "text" name = "classification" value={formData.classification} onChange={handleChange}></input></label>
            <label>Category: <input type = "text" name = "category" value={formData.category} onChange={handleChange}></input></label>
            <label>Page Count: <input type = "text" name = "pageCount" value={formData.pageCount} onChange={handleChange}></input></label>
            <label>Price: <input type = "text" name = "price" value={formData.price} onChange={handleChange}></input></label>
            <button type = "submit">Update Book</button>
            <button type = "button" onClick={onCancel}>Cancel</button>
        </form>
    )
}



export default EditBookform;

function addBook(formData: Book) {
    throw new Error("Function not implemented.");
}
