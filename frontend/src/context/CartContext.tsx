import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
            const saved = localStorage.getItem("cart");
            return saved ? JSON.parse(saved) : [];
          }
    );

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
          const existing = prevCart.find(i => i.bookId === item.bookId);
      
          if (existing) {
            return prevCart.map(i =>
              i.bookId === item.bookId
                ? { ...i, quantity: i.quantity + 1 }
                : i
            );
          } else {
            return [...prevCart, { ...item, quantity: 1 }];
          }
        });
      };

    const removeFromCart = (bookId: number) => {
        setCart((previousCart) => previousCart.filter((c) => c.bookId === bookId));
    };

    const clearCart = () => {
        setCart(() => []);
    };

    return (
        <CartContext.Provider value = {{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used withing a CartProvider");
    }
    return context;
}