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

function userFacade() {
  const addUser = (user, callback) => {
    const options = makeOptions("POST", false, user);
    return fetch(URL + links.add_user, options)
      .then(handleHttpErrors)
      .then((res) => {
        console.log(res);
      });
  };
  const editUser = (user) => {
    const options = makeOptions("POST", true, user);
    return fetch(URL + links.add_user, options).then(handleHttpErrors);
  };

  const addContact = (contact) => {
    const options = makeOptions("POST", true, contact);
    return fetch(URL + links.add_contact, options).then(handleHttpErrors);
  };

  return { addUser, editUser, addContact };
}

const facade = userFacade();
export default facade;
