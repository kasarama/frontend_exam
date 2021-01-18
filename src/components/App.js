import "../App.css";
import Header from "./Header";
import Home from "./Home";
import Admin from "./Admin";
import Demo from "./Demo";
import Login from "./Login";
import Profile from "./Profile";
import Redirect from "./Redirect";
import Register from "./Register";
import Sale from "./Sale";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";

import apiFacade from "../facades/apiFacade";

import React, { useState } from "react";

function App() {
  const activeUser = apiFacade.loggedIn();

  const [roles, setRoles] = useState(activeUser.roles);
  const [activeUserName, setActiveName] = useState(activeUser.username);
  const user = roles.includes("user");
  const admin = roles.includes("admin");

  const checkActive = (check) => {
    if (check === true) {
      const user = apiFacade.loggedIn();
      setActiveName(user.username);
      setRoles(user.roles);
    }
  };

  const logout = (e) => {
    e.preventDefault();
    apiFacade.logout();
    setRoles([]);
    setActiveName("");
  };
  return (
    <Router>
      <div className="App">
        <Header activeUser={activeUserName} roles={roles} logout={logout} />
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/demo">
          <Demo />
        </Route>
        <Route path="/sale">
          <Sale />
        </Route>

        {admin ? (
          <Route path="/admin">
            <Admin />
          </Route>
        ) : (
          ""
        )}
        {user || admin ? (
          ""
        ) : (
          <Route path="/login">
            <Login checkActive={checkActive} />
          </Route>
        )}
        {user || admin ? (
          ""
        ) : (
          <Route path="/register">
            <Register checkActive={checkActive} />
          </Route>
        )}
        {user || admin ? (
          <Route path="/profile">
            <Profile />
          </Route>
        ) : (
          ""
        )}
        {user || admin ? (
          <Route path="/redirect">
            <Redirect logout={logout} />
          </Route>
        ) : (
          ""
        )}
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}
function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
export default App;
/*

  <Router>
      <div className="App">
        <Header activeUser={activeUserName} roles={roles} logout={logout} />
      </div>
      <Switch>
        <Route   path="/">
          <Home />
        </Route>

        <Route   path="/demo">
          <Demo />
        </Route>
        <Route   path="/sale">
          <Sale />
        </Route>

        {admin ? (
          <Route   path="/admin">
            <Admin />
          </Route>
        ) : (
          ""
        )}
        {user || admin ? (
          ""
        ) : (
          <Route   path="/login">
            <Login checkActive={checkActive} />
          </Route>
        )}
        {user || admin ? (
          ""
        ) : (
          <Route   path="/register">
            <Register checkActive={checkActive} />
          </Route>
        )}
        {user || admin ? (
          <Route   path="/profile">
            <Profile />
          </Route>
        ) : (
          ""
        )}
        {user || admin ? (
          <Route   path="/redirect">
            <Redirect logout={logout} />
          </Route>
        ) : (
          ""
        )}
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>

*/
