import axios from 'axios';
import baseURL from '../../assets/common/baseUrl';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userRegister = (user) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post(`${baseURL}/users/register`, user);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('eshop-user', jsonValue);
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error });
  }
};

export const userLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const { data } = await axios.post(`${baseURL}/users/login`, {
      email,
      password,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('eshop-user', jsonValue);
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
  }
};
