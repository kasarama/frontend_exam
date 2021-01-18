import AddContact from "./AddContact";
import ContactList from "./ContactList";

export default function Sale() {
  const initContactList = [
    { name: "abc", id: 21 },
    { name: "xyz", id: 2 },
    { name: "holla", id: 13 },
    { name: "ciao", id: 40 },
    
  ];

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <AddContact />
          </div>
          <div className="col-sm-9">
            <div className="row">
              <ContactList list={initContactList} />
            </div>
            <div className="row"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
