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

        <Route exact path="/demo">
          <Demo />
        </Route>
        <Route exact path="/sale">
          <Sale />
        </Route>

        {admin ? (
          <Route exact path="/admin">
            <Admin />
          </Route>
        ) : (
          ""
        )}
        {user || admin ? (
          ""
        ) : (
          <Route exact path="/login">
            <Login checkActive={checkActive} />
          </Route>
        )}
        {user || admin ? (
          ""
        ) : (
          <Route exact path="/register">
            <Register checkActive={checkActive} />
          </Route>
        )}
        {user || admin ? (
          <Route exact path="/profile">
            <Profile />
          </Route>
        ) : (
          ""
        )}
        {user || admin ? (
          <Route exact path="/redirect">
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
        <Route exact path="/">
          <Home />
        </Route>
        {user ? (
          <Route exact path="/demo">
            <Demo />
          </Route>
        ) : (
          ""
        )}
        {admin ? (
          <Route exact path="/admin">
            <Admin />
          </Route>
        ) : (
          ""
        )}
        {user || admin ? (
          ""
        ) : (
          <>
            <Route exact path="/login">
              <Login checkActive={checkActive} />
            </Route>
            <Route exact path="/register">
              <Register checkActive={checkActive} />
            </Route>
          </>
        )}
        {user || admin ? (
          <>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/redirect">
              <Redirect logout={logout} />
            </Route>
          </>
        ) : (
          ""
        )}
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
*/

/*
<Router>
      <div className="App">
        <Header activeUser={activeUserName} roles={roles} logout={logout} />
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/demo">
          <Demo />
        </Route>

        <Route exact path="/admin">
          <Admin />
        </Route>

        <Route exact path="/login">
          <Login checkActive={checkActive} />
        </Route>
        <Route exact path="/register">
          <Register checkActive={checkActive} />
        </Route>

        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/redirect">
          <Redirect logout={logout} />
        </Route>

        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}
function NoMatch() {
  let location = useLocation();
  console.log("NOMATCH");

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
    */
