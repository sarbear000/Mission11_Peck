import {useEffect, useState} from "react";
import type {Book} from "../types/Book";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";


function BookList({selectedCategories}: {selectedCategories: string[]}) {

    const { addToCart } = useCart();
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const[totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>("");
    const navigate = useNavigate();
    const handleAddToCart = (b: Book) => {
        addToCart({
          bookId: b.bookID,
          title: b.title,
          price: b.price,
          quantity: 1
        });
      
        // show toast
        setShowToast(true);
      
        // hide after 2 seconds
        setTimeout(() => setShowToast(false), 2000);
      };
      const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {

            const categoryParams = selectedCategories.map((cat) => `bookCategories=${encodeURIComponent(cat)}`).join('&');

            const response = await fetch(`https://localhost:5000/api/book/AllBooks?pageLength=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            console.log(data);
            setBooks(data.books);
            setTotalItems(data.totalNumBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };

        fetchBooks();
    }, [pageSize, pageNum, totalItems, sortBy, selectedCategories]);

    return (
        <>
        {showToast && (
        <div 
            className="toast show position-fixed top-0 end-0 m-3 bg-success text-white"
            style={{ zIndex: 9999 }}
            role="alert"
        >
            <div className="toast-body">
            ✅ Book added to cart!
            </div>
        </div>
        )}
            <label>
                Sort by:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">None</option>
            <option value="title">Title (A–Z)</option>
            <option value="title_desc">Title (Z–A)</option>
            </select>
            </label>
            <br></br>
            {books.map((b) =>
                <div id = "bookCard" className="card" key = {b.bookID}>
                    <h3 className = "card-title">{b.title}</h3>
                    <div className = "card-body">
                    <ul className = "list-unstyled">
                        <li>Author: {b.author}</li>
                        <li>Publisher: {b.publisher}</li>
                        <li>ISBN: {b.isbn}</li>
                        <li>Classification: {b.classification}</li>
                        <li>Category: {b.category}</li>
                        <li>Page Count: {b.pageCount}</li>
                        <li className="badge bg-success ms-2">Price: ${b.price}</li>
                    </ul>

                    <button 
                        className='btn btn-success' 
                        onClick={() => handleAddToCart(b)}
                        >
                        Add to Cart
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => navigate('/cart')}
                        >
                        Go to Cart
                    </button>
                    </div>
                </div>

               
        
        )}

        <button disabled = {pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>
        {
            [...Array(totalPages)].map((_, index) => (
                <button key = {index + 1} onClick = {() => setPageNum(index + 1)} disabled = {pageNum === (index + 1)}>{index + 1}</button>
            ))
        }
        <button disabled = {pageNum === totalPages} onClick = {() => setPageNum(pageNum + 1)}>Next</button>

        <br></br>
        <label>
            Results Per Page: 
            <select value = {pageSize} onChange = {
                (b) => {
                    setPageSize(Number(b.target.value));
                    setPageNum(1);
                }

                 }>
                <option value = "5">5</option>
                <option value = "10">10</option>
                <option value = "20">20</option>
            </select>
        </label>
        </>
    );
}

export default BookList