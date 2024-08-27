import React, { useState } from 'react';
import { deleteTask, updateTask } from '../utils/apiCalls'; // Ensure updateTask is imported

const TaskList = ({ tasks, setTasks }) => {
  const [isEditing, setIsEditing] = useState(null); // To track which task is being edited
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Handle task deletion
  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id)); // Remove the task from the list
      })
      .catch(error => console.error('There was an error deleting the task!', error));
  };

  // Handle task completion toggle
  const handleCompletionToggle = (task) => {
    const updatedTask = {
      ...task,
      status: task.status === 'incomplete' ? 'complete' : 'incomplete', // Toggle status
    };

    updateTask(updatedTask)
      .then(() => {
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t))); // Update task in state
      })
      .catch(error => console.error('There was an error updating the task!', error));
  };

  // Handle entering edit mode
  const startEditing = (task) => {
    setIsEditing(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Handle editing a task
  const handleEditSubmit = (task) => {
    const updatedTask = {
      ...task,
      title: editTitle,
      description: editDescription,
    };

    updateTask(updatedTask)
      .then(() => {
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t))); // Update task in state
        setIsEditing(null); // Exit edit mode
      })
      .catch(error => console.error('There was an error updating the task!', error));
  };

  return (
    <div className="usa-card-group">
      {tasks.length > 0 ? (
        tasks.map(task => (
          <div className="usa-card tablet-lg:grid-col-6 widescreen:grid-col-4" key={task.id}>
            <div className="usa-card__container">
              <div className="usa-card__header">
                {isEditing === task.id ? (
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
                {isEditing === task.id ? (
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                ) : (
                  <p>{task.description || 'No description provided.'}</p>
                )}
                <label>
                  <input
                    type="checkbox"
                    checked={task.status === 'complete'} // Mark as checked if task is complete
                    onChange={() => handleCompletionToggle(task)} // Handle status toggle
                  />
                  Complete Task
                </label>
              </div>
              <div className="usa-card__footer">
                {isEditing === task.id ? (
                  <button
                    className="usa-button"
                    onClick={() => handleEditSubmit(task)}
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      className="usa-button"
                      onClick={() => startEditing(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="usa-button"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete Task
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
