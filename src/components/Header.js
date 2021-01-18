//import { useState } from "react";
import { NavLink } from "react-router-dom";
//import apiFacade from "../facades/apiFacade";
import { useHistory } from "react-router-dom";

export default function Header({ activeUser, roles, logout }) {
  const history = useHistory();
  const user = roles.includes("user");
  const admin = roles.includes("admin");
  const ar = "admin";
  return (
    <div className="container-fluid headerr">
      <div className="row">
        <div className="col-sm-8">
          <ul className="header">
            <li>
              <NavLink exact activeClassName="active" to="/">
                HOME
              </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/sale">
                 Sale
                </NavLink>
              </li>
            {admin || user ? (
              ""
            ) : (
              <li>
                <NavLink activeClassName="active" to="/login">
                  Log in
                </NavLink>
              </li>
            )}
            {admin ? (
              <li>
                <NavLink activeClassName="active" to="/admin">
                  Administration
                </NavLink>
              </li>
            ) : (
              ""
            )}
            {user ? (
              <li>
                <NavLink activeClassName="active" to="/demo">
                  Demo
                </NavLink>
              </li>
            ) : (
              ""
            )}

            {user || admin ? (
              <li>
                <NavLink activeClassName="active" to="/profile">
                  Profile
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        <div className="col-sm-2" style={{ padding: "14px 16px" }}>
          <span style={{ backgroundColor: "#701981", fontWeight: "bold" }}>
            {activeUser}
          </span>
        </div>
        <div className="col-sm-2">
          {user || admin ? (
            <button
              className="buttonSmall"
              onClick={(e) => {
                logout(e);
                history.push("/");
              }}
            >
              Log out
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
