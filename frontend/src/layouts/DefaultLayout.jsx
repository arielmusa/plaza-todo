import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <>
      <nav className="navbar navbar-light bg-light px-3">
        <span className="navbar-brand">Plaza Todo</span>
        <button
          className="btn btn-outline-danger"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </nav>

      <Outlet />
    </>
  );
}
