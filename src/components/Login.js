import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import apiFacade from "../facades/apiFacade";

export default function Login({ checkActive }) {
  const history = useHistory();
  const [msg, setMsg] = useState(" ");
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [token, setToken] = useState("token");
  const [startLogin, setStartLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startRedirect, setRedirect] = useState(false);

  const loader = (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="loader"></div>
    </div>
  );

  const onChange = (event) => {
    setStartLogin(false);
    event.preventDefault();
    setLoginCredentials({
      ...loginCredentials,
      [event.target.id]: event.target.value,
    });
    setMsg("");
  };

  const onLogin = (event) => {
    event.preventDefault();
    if (loginCredentials.username.length < 1) {
      setMsg("username is missng");
    } else if (loginCredentials.password.length < 1) {
      setMsg("password is missing");
    } else {
      setLoading(true);
      setStartLogin(true);
    }
  };

  function redirect() {
    let roles = token.roles;
    if (token != "token") {
      if (roles.includes("user") & roles.includes("admin")) {
        history.push("/redirect");
      } else if (roles.includes("user")) {
        history.push("/profile");
      } else if (roles.includes("admin")) {
        history.push("/admin");
      }
    }
  }

  useEffect(() => {
    let mounted = true;
    if (startLogin) {
      apiFacade
        .login(loginCredentials, setToken)
        .then(() => {
          if (mounted) {
            const loggedIn = apiFacade.loggedIn();
            setMsg("Welcome, " + loggedIn.username);
            setLoading(false);
            checkActive(true);
            setRedirect(!startRedirect);
          }
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setMsg(e.message));
          } else {
            setMsg("Network error has occurred: could not log in");
            console.log("Network error! Could not log in");
          }
          setLoading(false);
        });

      return function cleanUp() {
        mounted = false;
        setStartLogin(false);
      };
    }
  }, [startLogin]);

  useEffect(() => {
    redirect();
  }, [startRedirect]);

  return (
    <div className="loginContainer">
      <div className="loginHeader">
        <input
          className="input"
          type="text"
          id="username"
          placeholder="username"
          onChange={onChange}
        ></input>{" "}
        <input
          className="input"
          type="password"
          id="password"
          placeholder="password"
          onChange={onChange}
        ></input>
        <div className="loginHeader">{loading ? loader : msg}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <button className="button" onClick={onLogin}>
          Log in
        </button>
      </div>
      <div>
        <div className="loginHeader">Not an user yet?</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="button">Register</button>
        </div>
      </div>
    </div>
  );
}
