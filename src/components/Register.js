import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import userFacade from "../facades/userFacade";
export default function Register({ checkActive }) {
  const history = useHistory();
  const [msg, setMsg] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [startRegister, setStartRegister] = useState(false);
  const [token, setToken] = useState("token");

  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  });
  const [password2, setPass2] = useState("");
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
    event.preventDefault();
    setLoginCredentials({
      ...loginCredentials,
      [event.target.id]: event.target.value,
    });
    setMsg("");
  };
  const onChange2 = (event) => {
    event.preventDefault();
    setPass2(event.target.value);
    setMsg("");
  };

  const onRegister = (e) => {
    e.preventDefault();
    if (loginCredentials.username.length < 1) {
      setMsg("username is missng");
    } else if (loginCredentials.password.length < 1) {
      setMsg("password is missing");
    } else if (password2.length < 1) {
      setMsg("password is missing");
    } else if (password2 != loginCredentials.password) {
      setMsg("passwords differ, try again");
    } else {
      setLoading(true);
      setStartRegister(true);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (startRegister) {
      userFacade
        .addUser(loginCredentials, setToken)
        .then(() => {
          if (mounted) {
            setLoading(false);
            checkActive(true);

            setMsg("Welcome on board,");

            setTimeout(() => {
              history.push("/profile");
            }, 1000 * 3);
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
    }
  }, [startRegister]);

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
        <input
          className="input"
          type="password"
          id="password2"
          placeholder="repeat password"
          onChange={onChange2}
        ></input>
        <div className="loginHeader">{loading ? loader : msg}</div>
      </div>

      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="button" onClick={(e) => onRegister(e)}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
