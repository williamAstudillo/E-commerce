import axios from 'axios';
import AuthActionTypes from './authTypes';

export function logIn(payload) {
  return function (dispatch) {
    // console.log(payload);
    return axios
      .post('http://localhost:3000/auth/login', {
        email: payload.email,
        password: payload.password,
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: AuthActionTypes.LOG_IN, payload: res.data });
      })
      .catch((e) => console.log('error auxilio log in '));
  };
}

export function logInGoogle() {
  return function (dispatch) {
    return axios
      .get('http://localhost:3000/auth/me', { withCredentials: true })
      .then((res) => {
        console.log(res.data)
        dispatch({ type: AuthActionTypes.LOG_IN_GOOGLE, payload: res.data });
      })
      .catch((e) => console.log('error auxilio log in googleano'));
  };
}

export function logOut() {
  return function (dispatch) {
    return axios
      .get('http://localhost:3000/auth/logout')
      .then((res) => {
        console.log(res);
        dispatch({ type: AuthActionTypes.LOG_OUT, payload: res.data });
      })
      .catch((e) => console.log('error auxilio log out '));
  };
}
