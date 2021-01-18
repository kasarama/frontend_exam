import links from "../settings.js";
import apiFacade from "./apiFacade";
import jwt_decode from "jwt-decode";
const URL = links.server;
const EXPIRE_TIME = 1000 * 60 * 30;

const makeOptions = apiFacade.makeOptions;
function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }

  return res.json();
}

const getToken = (token) => {
  return localStorage.getItem("jwtToken", token);
};

function userFacade() {
  const addUser = (user, callback) => {
    const options = makeOptions("POST", false, user);
    return fetch(URL + links.add_user, options)
      .then(handleHttpErrors)
      .then((res) => {
        console.log(res);
        // setWithExpiry("jwtToken", res.token, EXPIRE_TIME);
        //callback(jwt_decode(res.token));
      });
  };
  const editUser = (user) => {
    const options = makeOptions("POST", true, user);
    return fetch(URL + links.add_user, options).then(handleHttpErrors);
  };

  return { addUser, editUser };
}
const setWithExpiry = (key, value, ttl) => {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
};
const facade = userFacade();
export default facade;
