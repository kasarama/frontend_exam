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
  const usersContacts = () => {
    const options = makeOptions("GET", true);
    return fetch(URL + links.users_contacts, options).then(handleHttpErrors);
  };

  const editContact = (contact) => {
    const options = makeOptions("PUT", true, contact);
    return fetch(URL + links.edit_contact, options).then(handleHttpErrors);
  };
  const deleteContact = (id) => {
    const options = makeOptions("DELETE", true, id);
    return fetch(URL + links.delete_contatc, options).then(handleHttpErrors);
  };

  return {
    addUser,
    editUser,
    addContact,
    usersContacts,
    editContact,
    deleteContact,
  };
}

const facade = userFacade();
export default facade;
