import React, { useState } from 'react';
import { deleteTask, updateTask } from '../utils/apiCalls';

const TaskList = ({ tasks, setTasks }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('There was an error deleting the task!', error));
  };

  const handleCompletionToggle = (task) => {
    const updatedTask = {
      ...task,
      status: task.status === 'incomplete' ? 'complete' : 'incomplete',
    };

    updateTask(updatedTask)
      .then(() => {
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
      })
      .catch(error => console.error('There was an error updating the task!', error));
  };

  const startEditing = (task) => {
    setIsEditing(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleEditSubmit = (task) => {
    const updatedTask = {
      ...task,
      title: editTitle,
      description: editDescription,
    };

    updateTask(updatedTask)
      .then(() => {
        setTasks(tasks.map(t => (t.id === task.id ? updatedTask : t)));
        setIsEditing(null);
      })
      .catch(error => console.error('There was an error updating the task!', error));
  };

  const containerStyle = {
    marginTop: "30px", 
    alignItems: "start"
  }

  return (
    <div style={containerStyle} className="grid-container">
      <div className="card-container"> {/* Flexbox container for cards */}
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div className="card" key={task.id}>
              <div className="usa-card usa-card--flag">
                <div className="usa-card__container card-content"> {/* Center content */}
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
                        checked={task.status === 'complete'}
                        onChange={() => handleCompletionToggle(task)}
                      />
                      Complete Task
                    </label>
                  </div>
                  <div className="usa-card__footer">
                    {isEditing === task.id ? (
                      <button className="usa-button" onClick={() => handleEditSubmit(task)}>
                        Save
                      </button>
                    ) : (
                      <>
                        <button className="usa-button" onClick={() => startEditing(task)}>
                          Edit
                        </button>
                        <button className="usa-button" onClick={() => handleDelete(task.id)}>
                          Delete Task
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
