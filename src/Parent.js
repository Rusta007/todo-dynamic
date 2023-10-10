import { useState } from "react";

function ParentAdd({ onAddParent }) {
  const [name, setName] = useState("");

  const handleAddParent = () => {
    if (name.trim() !== "") {
      onAddParent(name);
      setName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleAddParent} className="button">
        Add me
      </button>
    </div>
  );
}
export default ParentAdd;
