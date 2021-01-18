import { useEffect, useState } from "react";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import Contact from "./Contact";
import userFacade from "../facades/userFacade";

import {
  Switch,
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

export default function Sale() {
  const [contactiID, setID] = useState(null);
  const initContactList = [
    { name: "abc", id: 21 },
    { name: "xyz", id: 2 },
    { name: "holla", id: 13 },
    { name: "ciao", id: 40 },
  ];
  const [list, setList] = useState("");
  const [render, setRender] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [arrCOntacts, setArr] = useState([]);

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
  let { path, url } = useRouteMatch();

  useEffect(() => {
    let mounted = true;
    if (render) {
      userFacade
        .usersContacts()
        .then((res) => {
          setList(<ContactList list={res} setID={setID} />);
          setArr(res.map((e) => e));
          console.log(arrCOntacts);
        })
        .then(() => {
          if (mounted) {
            setLoading(false);
            setRender(false);
            setMsg("List :");
          }
        })
        .catch((err) => {
          if (err.status) {
            err.fullError.then((e) => setMsg(e.message));
          } else {
            setMsg("Network error has occurred:");
            console.log("Network error!");
          }
          setLoading(false);
          setRender(false);
        });
      return function cleanUp() {
        mounted = false;
        setRender(false);
      };
    }
  }, [render]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <AddContact render={setRender} />
          </div>
          <div className="col-sm-9">
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "#bdba11" }}
              onClick={(e) => {
                e.preventDefault();
                setRender(true);
                setLoading(true);
              }}
            >
              Show Contacts
            </button>
            {loading ? loader : msg}
            <div className="row">
              
              <div className="col-md-4" style={{ backgroundColor: "#e7e572" }}>
                <Switch>
                  <Route exact path={path}>
                    Details
                  </Route>
                  <Route exact path="/sale/:contactID">
                    <Contact
                      initialContact={arrCOntacts.find(
                        (e) => e.id === contactiID
                      )}
                    />
                  </Route>
                </Switch>
              </div><div className="col-md-8">
                <ul style={{ listStyleType: "none" }}>{list}</ul>
              </div>
            </div>
            <div className="row"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
