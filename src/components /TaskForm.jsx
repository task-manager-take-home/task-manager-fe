import React, { useState } from "react";
import { addTask } from "../utils/apiCalls";

const TaskForm = ({ addTaskToList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
    };

    addTask(newTask)
      .then((data) => {
        addTaskToList(data);
        setTitle("");
        setDescription("");
      })
      .catch((error) =>
        console.error("There was an error creating the task!", error)
      );
  };

  const formStyle = {
    backgroundColor: "#f8f8f8",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
    margin: "0 auto",  // Centers the form horizontally
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label className="usa-label" htmlFor="input-type-text-title">
          Task Title
        </label>
        <input
          className="usa-input"
          id="input-type-text-title"
          name="input-type-text-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="usa-label" htmlFor="input-type-text-description">
          Description
        </label>
        <input
          className="usa-input"
          id="input-type-text-description"
          name="input-type-text-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="usa-label" htmlFor="status">
          Status
        </label>
        <select
          className="usa-select"
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
      </div>
      <button className="usa-button" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
