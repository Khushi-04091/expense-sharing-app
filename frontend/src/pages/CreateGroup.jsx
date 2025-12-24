import { useState } from "react";
import api from "../api/api";

function CreateGroup() {
  const [name, setName] = useState("");

  const handleCreate = async () => {
    await api.post("/groups", {
      name,
      members: []
    });
    alert("Group created");
    setName("");
  };

return (
  <div className="auth-center">
    <div className="card">
      <h2>Create Group</h2>

      <input
        placeholder="Group Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleCreate}>
        Create Group
      </button>
    </div>
  </div>
);

}

export default CreateGroup;
