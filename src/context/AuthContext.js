import createDataContext from './createDataContext';
import axiosInstance from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload.token, info: action.payload.info, email: action.payload.email };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'signout':
      return { token: null, info: null, email: null, errorMessage: '' };
    case "update_user_info":
      return { ...state, info: action.payload };
    case 'get_player_info':
      return { ...state, info: action.payload };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    console.log(`Token: ${token}`);
    dispatch({ type: 'signin', payload: { token } });
    navigate('Landing');
  } else {
    navigate('Signin');
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'clear_error_message' });
};

const updateUserInfo = (dispatch) => async (info) => {
  try {
    const response = await axiosInstance.post("/updatePlayerInfo", { info });
    console.log(`updateUserInfo response: ${JSON.stringify(response.data)}`);
    await AsyncStorage.setItem("info", JSON.stringify(response.data.info));
    dispatch({ type: "update_user_info", payload: response.data.info });
  } catch (err) {
    console.log(`updateUserInfo error: ${err}`); dispatch({
      type: "add_error",
      payload: "Something went wrong with updating user info",
    });
  }
};

const getPlayerInfo = (dispatch) => async () => {
  try {
    const response = await axiosInstance.post('/getPlayerInfo');
    console.log(`Response: ${JSON.stringify(response.data.info)}`);
    dispatch({ type: 'get_player_info', payload: response.data.info });
    console.log(`State after dispatch: ${JSON.stringify(response.data.info)}`);
  } catch (err) {
    console.error('Error fetching player info:', err);
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with player info',
    });
  }
};

const signup = (dispatch) => async ({ email, password }) => {
  try {
    const response = await axiosInstance.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'signin', payload: { token: response.data.token } });
    navigate('Landing');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
  }
};

const signin = (dispatch) => async ({ email, password }) => {
  try {
    const response = await axiosInstance.post('/signin', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    await AsyncStorage.setItem('info', JSON.stringify(response.data.info));
    await AsyncStorage.setItem('email', JSON.stringify(response.data.email));
    dispatch({ type: 'signin', payload: { token: response.data.token, info: response.data.info, email: email } });
    navigate('Landing');
  } catch (err) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign in',
    });
  }
};

const signout = (dispatch) => async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('info');
  await AsyncStorage.removeItem('email');
  dispatch({ type: 'signout' });
  navigate('Signin');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin, getPlayerInfo, updateUserInfo },
  { token: null, info: null, email: null, errorMessage: '' }
);