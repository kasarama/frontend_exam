import { useState, useEffect } from "react";
import userFacade from "../facades/userFacade";

export default function Contact({ initialContact }) {
  const [startDelete, setStartDelete] = useState(false);
  const [contact, setContact] = useState(initialData());
  const [doEdit, setDoEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startEdit, setStartEdit] = useState(false);
  const [contactCredantial, setCCredantial] = useState({
    name: "",
    email: "",
    company: "",
    jobtitle: "",
    phone: "",
    id: contact.id,
  });
  const [msg, setMsg] = useState("");
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
    setCCredantial({
      ...contactCredantial,
      [event.target.id]: event.target.value,
    });
    setMsg("");
  };
  function initialData() {
    let data = initialContact;
    if (initialContact === undefined) {
      data = {
        name: "",
        email: "",
        company: "",
        jobtitle: "",
        phone: "",
        created: "",
        id: -1,
      };
    }
    return data;
  }
  const onClick = (event) => {
    event.preventDefault();
    let isAllData = true;
    const contactProp = Object.values(contactCredantial);
    contactProp.forEach((e) => {
      if (e.length < 1) {
        setMsg("some data is missing - try again");
        isAllData = false;
      }
    });
    if (isAllData) {
      setStartEdit(true);
      setLoading(true);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (startEdit) {
      userFacade
        .editContact(contactCredantial)
        .then((res) => setContact(res))
        .then(() => {
          if (mounted) {
            setMsg("Contact added");
            setLoading(false);
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
          setDoEdit(false);
        });
      return function cleanUp() {
        mounted = false;
        setStartEdit(false);
      };
    }
  }, [startEdit]);

  useEffect(() => {
    let mounted = true;
    if (startDelete) {
      console.log("using effectof stardelete");
      userFacade
        .deleteContact(contact.id)
        .then((res) => setMsg(res.msg))
        .then(() => {
          if (mounted) {
            setMsg("Contact deleted");
            setLoading(false);
            setContact({
              name: "",
              email: "",
              company: "",
              jobtitle: "",
              phone: "",
              created: "",
              id: -1,
            });
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
          setStartDelete(false);
        });
      return function cleanUp() {
        mounted = false;
        setStartDelete(false);
      };
    }
  }, [startDelete]);

  return (
    <div className="container-fluid">
      <div className="row">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{contact.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">e-mail</th>
              <td>{contact.email}</td>
            </tr>
            <tr>
              <th scope="row">company</th>
              <td>{contact.company}</td>
            </tr>
            <tr>
              <th scope="row">jobtitle</th>
              <td>{contact.jobtitle}</td>
            </tr>
            <tr>
              <th scope="row">phone</th>
              <td>{contact.phone}</td>
            </tr>
            <tr>
              <th scope="row">created</th>
              <td>{contact.created}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {contact.id > -1 ? (
        <div className="row">
          {!doEdit ? (
            <div>
              <button
                className="btn btn-primary"
                style={{ backgroundColor: "#bdba11" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMsg("processing...");
                  setDoEdit(true);
                }}
              >
                click to edit
              </button>
              <button
                className="btn btn-primary"
                style={{ backgroundColor: "#bdba11" }}
                onClick={(e) => {
                  e.preventDefault();
                  setMsg("processing...");

                  setStartDelete(true);
                }}
              >
                Click to delete
              </button>
              {loading ? loader : "  " + msg}
            </div>
          ) : (
            <div>
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ width: "80px" }}
                    id="inputGroup-sizing-sm"
                  >
                    name
                  </span>
                </div>
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ width: "80px" }}
                    id="inputGroup-sizing-sm"
                  >
                    email
                  </span>
                </div>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ width: "80px" }}
                    id="inputGroup-sizing-sm"
                  >
                    company
                  </span>
                </div>
                <input
                  id="company"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ width: "80px" }}
                    id="inputGroup-sizing-sm"
                  >
                    jobtitle
                  </span>
                </div>
                <input
                  id="jobtitle"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ width: "80px" }}
                    id="inputGroup-sizing-sm"
                  >
                    phone
                  </span>
                </div>
                <input
                  id="phone"
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={(e) => onChange(e)}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary"
                style={{ backgroundColor: "#bdba11" }}
                onClick={(e) => onClick(e)}
              >
                Save data
              </button>
              {loading ? loader : "  " + msg}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
