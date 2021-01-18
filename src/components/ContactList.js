import { useState } from "react";

export default function ContactList({ list }) {
  function sortByID() {
    console.log(list);
    function compare(a, b) {
      return a.id - b.id;
    }
    console.log(list.sort(compare));
  }
  function makeTable(sortingType) {
    sortingType();
    let contacts = [];
    list.forEach((element) => {
      contacts.push(
        <div className="col-md-1 col-sm-6">
          <table className="table table-sm" key={element.id + "contact"}>
            <thead>
              <tr>
                <th scope="col">{element.name}</th>
              </tr>
            </thead>
            <tbody></tbody>
            <tr>
              <td>{element.name}</td>
            </tr>
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
