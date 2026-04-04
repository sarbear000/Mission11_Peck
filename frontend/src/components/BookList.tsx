import {useEffect, useState} from "react";
import type {Book} from "../types/Book";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";


function BookList({selectedCategories}: {selectedCategories: string[]}) {

    const { addToCart } = useCart();
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>("");
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
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
        const loadBooks = async () => {

            try{
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, sortBy, selectedCategories);
                console.log(data);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        
        };

        loadBooks();
    }, [pageSize, pageNum, sortBy, selectedCategories]);

    if (loading) return <p>Loading books...</p>;
    if (error) return <p className = "text-red-500">Error: {error}</p>;

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
          <br></br>
           <div>
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate('/adminbooks')}
                    >
                    Admin Books
                </button>
            </div>
            <br></br>
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
        <Pagination 
                currentPage = {pageNum}
                totalPages = {totalPages}
                pageSize = {pageSize}
                onPageChange = {setPageNum}
                onPageSizeChange = {(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
        ></Pagination>

        </>
    );
}

export default BookList

function setLoading(arg0: boolean) {
    throw new Error("Function not implemented.");
}
function setError(message: string) {
    throw new Error("Function not implemented.");
}

