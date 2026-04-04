import type { Book } from "../types/Book";

interface FetchBooksResponse {
    Books: Book[];
    totalNumBooks: number;

}

const APIURL = 'https://localhost:5000/api/book'

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    sortBy: string,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try{
        const categoryParams = (selectedCategories || []).map((cat) => `bookCategories=${encodeURIComponent(cat)}`).join('&');

        const response = await fetch(`https://localhost:5000/api/book/AllBooks?pageLength=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}${selectedCategories.length ? `&${categoryParams}` : ''}`);
        if (!response.ok) {
            throw new Error("Failed to fetch books")
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching books", error);
        throw error;
    }
};

export const addProject = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${APIURL}/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok) {
            throw new Error('Failed to add book');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding project', error);
        throw error;
    }
};

export const updateBook = async (bookID: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${APIURL}/UpdateBook/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook)
        });

        if (!response.ok) {
            throw new Error("Failed to update book");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
};

export const deleteBook = async (bookID: number): Promise<void> => {
    try {
        const response = await fetch(`${APIURL}/DeleteBook/${bookID}`,
            {
                method: 'DELETE'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete book')
        }
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
};

// this was new
export const addBook = async (book: Book) => {
    const response = await fetch("https://localhost:5000/api/book/AddBook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });
  
    if (!response.ok) {
      throw new Error("Failed to add book");
    }
  
    return await response.json();
  };