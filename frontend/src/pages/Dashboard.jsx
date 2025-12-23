import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get("/groups");
        setGroups(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) return <h3>Loading groups...</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div style={{ marginBottom: "15px" }}>
        <Link to="/create-group">
          <button>Create New Group</button>
        </Link>
      </div>

      {groups.length === 0 ? (
        <p>No groups yet. Create one!</p>
      ) : (
        groups.map((group) => (
          <div
            key={group._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px"
            }}
          >
            <h3>{group.name}</h3>

            <p>
              Members:{" "}
              {group.members.map((m) => m.name).join(", ")}
            </p>
            <Link to={`/groups/${group._id}`}>
  <button>View Details</button>
</Link>


            <Link to="/add-expense">
              <button>Add Expense</button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;


