import { useState } from "react";

export default function ContactList({ list }) {
  function sortByID() {
    console.log(list);
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
        <div
          key={element.id}
          id={element.id}
          className="col-md-3 col-sm-6"
          onClick={(e) => showDetails}
          style={{ padding: 15, border: "solid" }}
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
