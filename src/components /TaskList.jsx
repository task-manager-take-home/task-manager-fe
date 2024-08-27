import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../utils/apiCalls';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from the API
    getTasks()
      .then(data => setTasks(data))
      .catch(error => console.error('There was an error fetching tasks!', error));
  }, []);

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('There was an error deleting the task!', error));
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
