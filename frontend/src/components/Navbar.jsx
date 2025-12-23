import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { logout } = useAuth();

  return (
    <nav style={{ display: "flex", gap: "15px" }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/create-group">Create Group</Link>
      <Link to="/add-member">Add Member</Link>

      <Link to="/add-expense">Add Expense</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;

