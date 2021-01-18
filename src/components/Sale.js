import { useEffect, useState } from "react";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import userFacade from "../facades/userFacade";
export default function Sale() {
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

  useEffect(() => {
    let mounted = true;
    if (render) {
      userFacade
        .usersContacts()
        .then((res) => {
          setList(<ContactList list={res} />);
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
              <div className="col-md-9">{list}</div>
              <div className="col-md-3" style={{ backgroundColor: "#e7e572" }}>
                {"DETAILS"}
              </div>
            </div>
            <div className="row"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
