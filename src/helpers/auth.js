import { axios } from "./axiosConfig";
import decodeJWT from "jwt-decode";

function login(credentials) {
  return axios.post("/api/auth/login", credentials);
}
function refresh(refreshToken) {
  return axios.post("/api/auth/refresh", {
    refreshToken: `Bearer ${refreshToken}`
  });
}
function register(userData) {
  return axios.post("/api/users/register", userData);
}
function logout() {
  return axios.post("/api/auth/logout");
}
function getAccessToken() {
  return JSON.parse(localStorage.getItem("accessToken"));
}
function getRefreshToken() {
  return JSON.parse(localStorage.getItem("refreshToken"));
}
function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
function setLocalStorageTokens(tokens) {
  if (tokens.accessToken)
    localStorage.setItem("accessToken", JSON.stringify(tokens.accessToken));
  if (tokens.refreshToken)
    localStorage.setItem("refreshToken", JSON.stringify(tokens.refreshToken));
}
function setLocalStorageUser(user){
  if(user){
    localStorage.setItem('user',JSON.stringify(user));
  }
}
function removeTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem('user')
}
function tokenExpiration(token) {
  return new Date(decodeJWT(token).exp * 1000);
}
function validateTokenExpirationTime(token) {
  if (!token) return false;
  const expMoment = tokenExpiration(token);
  if (expMoment) return expMoment > new Date();
  return false;
}
async function initializationUserAuthentication(store) {
  if (validateTokenExpirationTime(getAccessToken())&&getUser()) {
    const data = {
      accessToken: getAccessToken(),
      refreshToken: getRefreshToken(),
      user: getUser()
    };
    return store.dispatch("authorize", data);
  } else {
    if (validateTokenExpirationTime(getRefreshToken())) {
      return await store
        .dispatch("getNewRefreshToken")
        .then(() => {
          return Promise.resolve();
        })
        .catch(e => {
          return Promise.reject(e);
        });
    }
  }
}

export {
  login,
  register,
  logout,
  refresh,
  getAccessToken,
  getRefreshToken,
  removeTokens,
  validateTokenExpirationTime,
  setLocalStorageTokens,
  tokenExpiration,
  initializationUserAuthentication,
    getUser,
    setLocalStorageUser
};
