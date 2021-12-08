import {
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants';
import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';

export const getProductsList = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(`${baseURL}/products`);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_REQUEST });

    const { data } = await axios.get(`${baseURL}/categories`);

    dispatch({ type: CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_FAIL, payload: error });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    await axios.delete(`${baseURL}/products/${id}`);

    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error });
  }
};
