import { useEffect, useState } from "react";
import api from "../api/api";

function AddMember() {
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    api.get("/groups").then((res) => setGroups(res.data));
  }, []);

  const handleAdd = async () => {
    if (!groupId || !email) {
      alert("Please fill all fields");
      return;
    }

    await api.post("/groups/add-member", {
      groupId,
      email
    });

    alert("Member added");
    setEmail("");
  };

  return (
    <div className="add-member-page">
      <div className="card">
        <h2>Add Member</h2>

        <input
          type="email"
          placeholder="Member Email"
        />

        <select>
          <option>Select Group</option>
        </select>

        <button>Add Member</button>
      </div>
    </div>
  );
}

export default AddMember;

