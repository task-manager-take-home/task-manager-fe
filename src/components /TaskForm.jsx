import React, { useState } from "react";
import { addTask } from "../utils/apiCalls";
import TextField from "./TextField";
import SelectField from "./SelectField";

const TaskForm = ({ addTaskToList }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("incomplete");
  const [priority, setPriority] = useState("secondary");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
      priority,
    };

    addTask(newTask)
      .then((data) => {
        addTaskToList(data);
        setTitle("");
        setDescription("");
        setPriority("secondary");
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
    margin: "0 auto",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <TextField
        label="Task Title"
        id="input-type-text-title"
        value={title}
        onChange={setTitle}
        required={true}
      />
      <TextField
        label="Description"
        id="input-type-text-description"
        value={description}
        onChange={setDescription}
      />
      <SelectField
        label="Priority"
        id="priority"
        value={priority}
        onChange={setPriority}
        options={[
          { label: "Immediate", value: "immediate" },
          { label: "Secondary", value: "secondary" },
        ]}
      />
      <SelectField
        label="Status"
        id="status"
        value={status}
        onChange={setStatus}
        options={[
          { label: "Incomplete", value: "incomplete" },
          { label: "Complete", value: "complete" },
        ]}
      />
      <button className="usa-button" type="submit">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
