import React from 'react';
import { deleteTask, updateTask } from '../utils/apiCalls'; // Import updateTask

const TaskList = ({ tasks, setTasks }) => {
  
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

    // Update task in the backend
    updateTask(updatedTask)
      .then(() => {
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t))); // Update task in state
      })
      .catch(error => console.error('There was an error updating the task!', error));
  };

  return (
    <div className="usa-card-group">
      {tasks.length > 0 ? (
        tasks.map(task => (
          <div className="usa-card usa-card--flag flex-1" key={task.id}>
            <div className="usa-card__container">
              <div className="usa-card__header">
                <h4 className="usa-card__heading">{task.title}</h4>
              </div>
              <div className="usa-card__body">
                <p>{task.description || 'No description provided.'}</p>
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
                <button
                  className="usa-button"
                  onClick={() => handleDelete(task.id)}
                >
                  Delete Task
                </button>
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
