import React, { useState } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
export default function ContactList({ list, setID }) {
  let { path, url } = useRouteMatch();

  function sortByID() {
    function compare(a, b) {
      return a.id - b.id;
    }
    console.log(list.sort(compare));
  }

  const showDetails = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
  };

  function makeTable(sortingType) {
    sortingType();
    let contacts = [];
    list.forEach((element) => {
      contacts.push(
        <li
          key={element.id}
          onClick={(e) => {
            e.preventDefault();
            setID(element.id);
          }}
        >
          <Link to={url + "/" + element.id}>
            <div
              key={element.id}
              id={element.id}
              className="col-md-3 col-sm-6"
              style={{ padding: 15 }}
            >
              <table className="table table-sm" key={element.id + "contact"}>
                <thead>
                  <tr>
                    <th scope="col">{element.company}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{element.name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Link>
        </li>
      );
    });

    return contacts;
  }
  const [table, setTable] = useState(makeTable(sortByID));

  return (
    <div className="container-fluid">
      <div className="row">{table}</div>
    </div>
  );
}
