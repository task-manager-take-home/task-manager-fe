import React, { useState } from 'react';
import { deleteTask, updateTask } from '../utils/apiCalls';
import TaskCard from './TaskCard';
import TaskSort from './TaskSort';

const TaskList = ({ tasks, setTasks }) => {
  const [sortCriteria, setSortCriteria] = useState('none');

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

  const handleEdit = (updatedTask) => {
    updateTask(updatedTask)
      .then(() => {
        setTasks(tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      })
      .catch(error => console.error('There was an error updating the task!', error));
  };

  // Sorting function
  const sortTasks = (tasks) => {
    if (sortCriteria === 'completed') {
      return tasks.filter(task => task.status === 'complete');
    } else if (sortCriteria === 'incomplete') {
      return tasks.filter(task => task.status === 'incomplete');
    } else if (sortCriteria === 'priority') {
      return [...tasks].sort((a, b) => {
        if (a.priority === b.priority) return 0;
        return a.priority === 'immediate' ? -1 : 1;
      });
    }
    return tasks;
  };

  const sortedTasks = sortTasks(tasks);

  return (
    <div className="grid-container" style={{ marginTop: "30px", alignItems: "start" }}>
      <TaskSort sortCriteria={sortCriteria} onSortChange={setSortCriteria} />
      <div className="card-container">
        {sortedTasks.length > 0 ? (
          sortedTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onCompletionToggle={handleCompletionToggle}
            />
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
