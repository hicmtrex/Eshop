import React, { createContext } from 'react';

const StoreContext = createContext({
  userInfo: {},
  isOnline: false,
  loading: true,
  //Products
  products: [],
  setProducts: [],
  productsCtg: [],
  productsFiltred: [],
  setProductsFiltred: [],
  getProducts: () => {},
  deleteProduct: (id) => {},
  //Auth
  userLogin: (email, password) => {},
  userLogout: () => {},
  //Cart
  cartItems: [],
  addToCart: (product) => {},
  removeFromCart: (product) => {},
  deleteFromCart: (product) => {},
  clearCart: () => {},
  //orders
  createOrder: (order) => {},
});
export default StoreContext;
