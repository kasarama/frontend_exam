export default function Contact({ initialContact }) {
  const abc = {
    name: "School",
    email: "jb@mlm",
    company: "cdd",
    jobtitle: "dcxc",
    phone: "45456465",
    created: "20-12-2020 13:40 Wednesday",
  };
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">{initialContact.name}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">e-mail</th>
          <td>{initialContact.email}</td>
        </tr>
        <tr>
          <th scope="row">company</th>
          <td>{initialContact.company}</td>
        </tr>
        <tr>
          <th scope="row">jobtitle</th>
          <td>{initialContact.jobtitle}</td>
        </tr>
        <tr>
          <th scope="row">phone</th>
          <td>{initialContact.phone}</td>
        </tr>
        <tr>
          <th scope="row">created</th>
          <td>{initialContact.created}</td>
        </tr>
      </tbody>
    </table>
  );
}
