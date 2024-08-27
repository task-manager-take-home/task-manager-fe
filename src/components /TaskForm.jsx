import React, { useState } from "react";
import { addTask } from "../utils/apiCalls";

const TaskForm = ({ addTaskToList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(), // Generate a temporary ID for now
      title,
      description,
      status,
    };

    // Add task via API and update state
    addTask(newTask)
      .then((data) => {
        addTaskToList(data); // Update the task list with the new task
        setTitle(""); // Clear the form
        setDescription("");
      })
      .catch((error) =>
        console.error("There was an error creating the task!", error)
      );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className="usa-label" htmlFor="input-type-text-title">
          Task Title
        </label>
        <input
          className="usa-input"
          id="input-type-text-title"
          name="input-type-text-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Bind input to state
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
          onChange={(e) => setDescription(e.target.value)} // Bind input to state
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
          onChange={(e) => setStatus(e.target.value)} // Bind select to state
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
