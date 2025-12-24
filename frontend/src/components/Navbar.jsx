



import { useAuth } from "../context/AuthContext";

function Navbar({ title }) {
  const { logout } = useAuth();

  return (
    <div className="top-bar">
      <div className="page-badge">{title}</div>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Navbar;
