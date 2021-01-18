import links from "../settings.js";
import jwt_decode from "jwt-decode";
const URL = links.server;
const EXPIRE_TIME = 1000 * 60 * 30;

function apiFacade() {
  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };

  const login = (user, callback) => {
    const options = makeOptions("POST", false, user);
    return fetch(URL + links.login, options)
      .then(handleHttpErrors)
      .then((res) => {
        setWithExpiry("jwtToken", res.token, EXPIRE_TIME);
        setWithExpiry("user", user.username, EXPIRE_TIME);
        callback(jwt_decode(res.token));
      });
  };

  const loggedIn = () => {
    let user = { roles: [], username: "a" };

    const tokenString = localStorage.getItem("jwtToken");
    const now = new Date();

    const tokenItem = JSON.parse(tokenString);
    if (tokenString === null) {
      user = { roles: [], username: "" };
    } else if (now.getTime() > tokenItem.expiry) {
      user = { roles: [], username: "" };
    } else {
      const token = jwt_decode(tokenItem.value);
      let roles = token.roles.split(",");
      user = { roles: roles, username: token.sub };
    }

    return user;
  };
  const activeUser = () => {
    return localStorage.getItem("user");
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  return {
    activeUser,
    login,
    loggedIn,
    logout,
    makeOptions,
  };
}

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }

  return res.json();
}

const getToken = (token) => {
  return localStorage.getItem("jwtToken", token);
};

//https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
function setWithExpiry(key, value, ttl) {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}
const facade = apiFacade();

export default facade;

/*

  //https://www.w3schools.com/js/tryit.asp?filename=tryjs_prompt
  function reLogin(user, reaction) {
    console.log("relogin() Called");

    let mounted = true;
    var password = prompt(
      'Your sesion is about to expire. Type your password and press "OK" to relogin or cancle'
    );
    function callback() {}
    if (password === user.password) {
      login(user, callback).then(() => {
        if (mounted) {
          alert("Your session has been excended");
          reaction = true;
        }
      });
    } else {
      if (password === null || password === "") {
        logout();
        alert("Goodbye, " + user.username + ".");
      } else {
        logout();
        alert("Login failed. Goodbye.");
      }
    }
    return function cleanUp() {
      mounted = false;
    };
  }
  function sessionExpire(user) {
    console.log("sesionExpire() Called");
    let reaction = false;
    reLogin(user, reaction);
    if (!reaction) {
      setTimeout(() => {
        logout();
      }, 1000 * 16);
      // },EXPIRE_TIME)
    }
  }

  const login = (user, callback) => {
    const options = makeOptions("POST", false, user);
    return fetch(URL + links.login, options)
      .then(handleHttpErrors)
      .then((res) => {
        setWithExpiry("jwtToken", res.token, EXPIRE_TIME);
        setWithExpiry("user", user.username, EXPIRE_TIME);
        callback(jwt_decode(res.token));
        console.log("OHHHHHH");
        setTimeout(function () {
          sessionExpire(user);
          //}, 1000 * 60 * 29);
        }, 1000 * 10);
      });
  };
  */
