import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";

function GroupsList() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    api.get("/groups").then((res) => setGroups(res.data));
  }, []);

return (
  <div className="card" style={{ width: "700px" }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Your Groups
        </h2>

        {groups.length === 0 && <p>No groups yet</p>}

        {groups.map((group) => (
          <div
            key={group._id}
            style={{
              border: "1px solid #e5e7eb",
              padding: "14px",
              borderRadius: "8px",
              marginBottom: "12px"
            }}
          >
            <h3>{group.name}</h3>
            <p>
              Members: {group.members.map((m) => m.name).join(", ")}
            </p>

            <Link to={`/groups/${group._id}`}>
              <button style={{ width: "auto" }}>
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    
  );
}

export default GroupsList;
