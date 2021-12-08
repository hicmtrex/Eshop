import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import cartItems, { cartReducer } from './reducers/cartReducer';
import {
  getCategoryReducer,
  getProductsReducer,
} from './reducers/productsReducer';
import { userLoginReducer, userRegisterReducer } from './reducers/usersReducer';

const reducers = combineReducers({
  cartItems: cartItems,
  getProducts: getProductsReducer,
  getCategories: getCategoryReducer,
  //users
  register: userRegisterReducer,
  login: userLoginReducer,
});

const middleware = [thunk];

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
