import './App.css'
import BooksPage from './pages/BooksPage';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path = '/' element = {<BooksPage />}></Route>
          <Route path = '/cart' element = {<CartPage/>}></Route>
        </Routes>
      </Router>
    </CartProvider>
      
    </>
  )
}

export default App
