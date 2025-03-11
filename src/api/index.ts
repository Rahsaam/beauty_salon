import axios from "axios";
// import {store} from "../store/store";
// import {clearToken} from "./authentication/functions/authSlice";

// const redirectLogOutOnResponseStatus = [401, 403, 504];

/**
 * Request Success Handler
 */
// const requestSuccessHandler = config => {
//     const {auth} = store.getState();
//     config.headers.Authorization =  auth?.token;
//   return config;
// };

// /**
//  * Request Fail Handler
//  */
// const requestErrorHandler = err => {
//   return Promise.reject(err);
// };

// /**
//  * Response Success Handler
//  */
// const responseSuccessHandler = res => {
//   const response: DefaultResponse = res.data;
//   if (200 <= res.status && res.status < 300) {
//     return res.data;
//   } else {
//     return responseErrorHandler(res);
//   }
// };

// /**
//  * Response Fail handler
//  */
// const responseErrorHandler = err => {
//   if (err.code === "ERR_NETWORK") {
//     console.warn("Unable to connect to the server!")
//   }
//   if (redirectLogOutOnResponseStatus.includes(err.response.status)) {
//     store.dispatch(clearToken());
//     console.warn("logged out due to server access error!")
//   }
//   return Promise.reject(err);
// };

/**
 * Axios 객체
 **/

const request = axios.create({
  baseURL: 'https://teamim.org/beauty/api/',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/**
 * Axios Request Middleware
 */
// request.interceptors.request.use(
//   (config) => requestSuccessHandler(config),
//   (err) => requestErrorHandler(err)
// );

// /**
//  * Axios Response Middleware
//  */
// request.interceptors.response.use(
//   (res) => responseSuccessHandler(res),
//   (err) => responseErrorHandler(err)
// );

export default request;
