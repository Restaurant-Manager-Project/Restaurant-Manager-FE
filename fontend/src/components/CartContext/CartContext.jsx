import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [productData, setProductData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Lấy dữ liệu sản phẩm từ API
    const fetchProductData = async () => {
      try {
        const response = await axios.get('https://restaurant-manager-be-f47n.onrender.com/api/products');
        if (response.data.success) {
          setProductData(response.data.result);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, []);

  const clearCart = () => {
    setCartItems([]);
  };

  const addToCart = (product, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateCartItemQuantity = (productId, quantity) => {
    const product = productData.find(product => product.id === productId);
    if (product && quantity > product.quantity) {
      alert(`Số lượng sản phẩm "${product.name}" chỉ còn "${product.quantity}". Vui lòng điều chỉnh lại số lượng.`);
      return;
    }

    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
    setErrorMessage('');
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, updateCartItemQuantity, clearCart, errorMessage }}>
      {children}
    </CartContext.Provider>
  );
};