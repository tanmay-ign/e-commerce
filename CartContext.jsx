import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart(null);
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
      setCart(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity, size, color) => {
    try {
      setError(null);
      const response = await axios.post(`http://localhost:5000/api/cart/${user.id}/add`, {
        productId,
        quantity,
        size,
        color,
      });
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding item to cart');
      throw err;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      setError(null);
      const response = await axios.put(
        `http://localhost:5000/api/cart/${user.id}/update/${itemId}`,
        { quantity }
      );
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error updating quantity');
      throw err;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setError(null);
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${user.id}/remove/${itemId}`
      );
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error removing item from cart');
      throw err;
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      const response = await axios.delete(`http://localhost:5000/api/cart/${user.id}/clear`);
      setCart(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error clearing cart');
      throw err;
    }
  };

  const value = {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 