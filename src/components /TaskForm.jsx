import React, { useState } from 'react';
import { addTask } from '../utils/apiCalls';


const TaskForm = ({ addTaskToList }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('incomplete');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      description,
      status,
    };

    // Add task via API
    addTask(newTask)
      .then((data) => {
        addTaskToList(data); // Add the task to the task list
        setTitle('');
        setDescription('');
      })
      .catch(error => console.error('There was an error creating the task!', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input 
          type="text" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <div>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="incomplete">Incomplete</option>
          <option value="complete">Complete</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
