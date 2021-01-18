import { useHistory } from "react-router-dom";

export default function Redirect({ logout }) {
  const history = useHistory();
  return (
    <div className="loginContainer">
      <div className="loginHeader">Where to?</div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();

            history.push("/admin");
          }}
        >
          Admin
        </button>
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();

            history.push("/profile");
          }}
        >
          User
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {" "}
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            logout(e);

            history.push("/login");
          }}
        >
          Cancle
        </button>
      </div>
    </div>
  );
}
