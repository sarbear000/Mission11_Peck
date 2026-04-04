import { useState } from "react"
import type { Book } from "../types/Book"
import { addBook } from "../api/BooksAPI";

interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewBookform = ({onSuccess, onCancel}: NewBookFormProps) => {
    const [formData, setformData] = useState<Book>({
        bookID: 0,
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        classification: '',
        category: '',
        pageCount: 0,
        price: 0
    
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
      
        setformData({
          ...formData,
          [name]:
            name === "price" || name === "pageCount"
              ? Number(value)
              : value
        });
      };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const validationErrors = validate();
      
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          return; 
        }
      
        await addBook(formData);
        onSuccess();
      };

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // check inputs
    const validate = () => {
        const newErrors: { [key: string]: string } = {};
      
        if (!formData.title.trim()) {
          newErrors.title = "Title is required";
        }
      
        if (!/^\d+$/.test(formData.isbn)) {
          newErrors.isbn = "ISBN must be numbers only";
        }
      
        if (formData.pageCount <= 0) {
          newErrors.pageCount = "Page count must be a number";
        }
      
        if (formData.price <= 0) {
          newErrors.price = "Price must be a valid number";
        }
      
        return newErrors;
      };

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger">
                    Please fix the errors below.
                </div>
)}
            <h2>Add New Book</h2>
            <label>Book Title: <input type = "text" name = "title" value={formData.title} onChange={handleChange}></input></label>
            {errors.title && <p className="text-danger">{errors.title}</p>}
            <label>Author: <input type = "text" name = "author" value={formData.author} onChange={handleChange}></input></label>
            <label>Publisher: <input type = "text" name = "publisher" value={formData.publisher} onChange={handleChange}></input></label>
            <label>ISBN: <input type = "text" name = "isbn" value={formData.isbn} onChange={handleChange}></input></label>
            <label>Classification: <input type = "text" name = "classification" value={formData.classification} onChange={handleChange}></input></label>
            <label>Category: <input type = "text" name = "category" value={formData.category} onChange={handleChange}></input></label>
            <label>Page Count: <input type = "number" name = "pageCount" value={formData.pageCount} onChange={handleChange} min="1"></input></label>
            {errors.pageCount && <p className="text-danger">{errors.pageCount}</p>}
            <label>Price: <input type = "text" step = "0.01" name = "price" value={formData.price} onChange={handleChange}></input></label>
            {errors.price && <p className="text-danger">{errors.price}</p>}
            <button type = "submit">Add Book</button>
            <button type = "button" onClick={onCancel}>Cancel</button>
        </form>
    )
}



export default NewBookform;


