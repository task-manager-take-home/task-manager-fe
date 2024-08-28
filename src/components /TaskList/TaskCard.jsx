import React, { useState } from "react";

const TaskCard = ({ task, onDelete, onEdit, onCompletionToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);

  const handleEditSubmit = () => {
    const updatedTask = {
      ...task,
      title: editTitle,
      description: editDescription,
      priority: editPriority,
    };
    onEdit(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="usa-card usa-card--flag">
        <div className="usa-card__container card-content">
          <div className="usa-card__header">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <h4 className="usa-card__heading">{task.title}</h4>
            )}
          </div>
          <div className="usa-card__body">
            {isEditing ? (
              <>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="usa-select"
                >
                  <option value="immediate">Immediate</option>
                  <option value="secondary">Secondary</option>
                </select>
              </>
            ) : (
              <>
                <p>{task.description || "No description provided."}</p>
                <p>Priority: {task.priority}</p>
              </>
            )}
            <label>
              <input
                type="checkbox"
                checked={task.status === "complete"}
                onChange={() => onCompletionToggle(task)}
              />
              Complete Task
            </label>
          </div>
          <div className="usa-card__footer">
            {isEditing ? (
              <button className="usa-button" onClick={handleEditSubmit}>
                Save
              </button>
            ) : (
              <>
                <button
                  className="usa-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button
                  className="usa-button"
                  onClick={() => onDelete(task.id)}
                >
                  Delete Task
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
