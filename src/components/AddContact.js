import { useEffect } from "react";
import { useState } from "react";
import userFacade from "../facades/userFacade";
import Contact from "./Contact";

export default function AddContact({ render }) {
  const [contactCredantial, setCCredantial] = useState({
    name: "",
    email: "",
    company: "",
    jobtitle: "",
    phone: "",
  });
  const [msg, setMsg] = useState("");
  const [startAdding, setStartAdding] = useState(false);
  const [addedContact, setAddedContact] = useState("");
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

  const onChange = (event) => {
    event.preventDefault();
    setCCredantial({
      ...contactCredantial,
      [event.target.id]: event.target.value,
    });
    setMsg("");
  };

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
      setStartAdding(true);
      setLoading(true);
    }
  };
  useEffect(() => {
    let mounted = true;
    if (startAdding) {
      userFacade
        .addContact(contactCredantial)
        .then((res) => setAddedContact(<Contact initialContact={res} />))
        .then(() => {
          if (mounted) {
            setMsg("Contact added");
            setLoading(false);
            render(true);
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
        });
      return function cleanUp() {
        mounted = false;
        setStartAdding(false);
      };
    }
  }, [startAdding]);

  return (
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
        Add Contact
      </button>
      {loading ? loader : "  " + msg}
      <div style={{ width: 300 }}>{addedContact}</div>
    </div>
  );
}
