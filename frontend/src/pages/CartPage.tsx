import { useNavigate } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";

function CartPage() {
  const navigate = useNavigate();
  const { cart } = useCart();

  return (
    <>
      <WelcomeBand />

      <h2>Your Cart</h2>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.bookId}>
            <h4>{item.title}</h4>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Subtotal: ${item.price * item.quantity}</p>
          </div>
        ))
      )}

        <h3>
            Total: $
            {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
        </h3>

      <button className="btn btn-success">Checkout</button>
      <button 
        className="btn btn-secondary ms-2"
        onClick={() => navigate('/')}
      >
        Continue Browsing
      </button>
    </>
  );
}

export default CartPage;