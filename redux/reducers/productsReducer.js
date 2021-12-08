import {
  CATEGORY_FAIL,
  CATEGORY_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constants';

export const getProductsReducer = (
  state = { products: [], productsFiltred: [], productsCtg: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
        productsFiltred: [],
        productsCtg: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
        productsFiltred: action.payload,
        productsCtg: action.payload,
      };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getCategoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_FAIL:
      return { loading: true, categories: [] };
    case CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, product: action.payload, success: true };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
