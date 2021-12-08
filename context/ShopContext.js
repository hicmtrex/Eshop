import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoreContext from './store-context';
import baseURL from '../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopContextProvider = ({ children }) => {
  // Products State Mangments
  const [products, setProducts] = useState([]);
  const [productsFiltred, setProductsFiltred] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialState, setInitialState] = useState([]);

  //Auth
  const [userInfo, setUserInfo] = useState({});
  const [isOnline, setIsOnline] = useState(false);

  //Cart
  const addToCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    const exist = cartItems.find((item) => item.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, qty: item.qty - 1 } : item
        )
      );
    }
  };
  const deleteFromCart = (product) => {
    setCartItems(cartItems.filter((p) => p.id !== product.id));
  };
  clearCart;

  const clearCart = () => {
    setCartItems([]);
  };
  const saveCart = async (id) => {
    try {
      const jsonValue = JSON.stringify(cartItems);
      await AsyncStorage.setItem(`eshop-cart-${id}`, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCart = async (id) => {
    try {
      const value = await AsyncStorage.getItem(`eshop-cart-${id}`);
      if (value !== null) {
        setCartItems(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Products CRUD
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/products`);
      setProducts(data);
      setProductsFiltred(data);
      setInitialState(data);
      setProductsCtg(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${baseURL}/products/${id}`);
      const products = productsFiltred.filter((item) => item.id !== id);
      setProductsFiltred(products);
      console.log('Product Deleted');
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  //Auth
  const userLogin = async (email, password) => {
    try {
      const { data } = await axios.post(`${baseURL}/users/login`, {
        email,
        password,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUserInfo(data);
      setIsOnline(true);
      setLoading(false);
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('eshop-user', jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = async () => {
    try {
      await AsyncStorage.removeItem('eshop-user');
      setUserInfo({});
      setIsOnline(false);
      console.log('Data removed');
    } catch (err) {
      console.log(err.message);
    }
  };

  const loadUsers = async () => {
    try {
      const value = await AsyncStorage.getItem('eshop-user');
      if (value !== null) {
        setUserInfo(JSON.parse(value));
        setIsOnline(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //orders

  const createOrder = async (order) => {
    try {
      const { data } = await axios.post(`${baseURL}/orders`, order);
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    saveCart(userInfo._id);
  }, [cartItems]);

  useEffect(() => {
    loadUsers();
    loadCart(userInfo._id);
  }, [isOnline]);

  const values = {
    //Products
    getProducts,
    setProductsFiltred,
    setProductsCtg,
    deleteProduct,
    error,
    //Auth
    userLogin,
    userLogout,
    products,
    userInfo,
    productsFiltred,
    productsCtg,
    productsCtg,
    loading,
    initialState,
    isOnline,
    //cart
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
    cartItems,
    //orders
    createOrder,
  };
  return (
    <StoreContext.Provider value={values}>{children}</StoreContext.Provider>
  );
};

export default ShopContextProvider;
