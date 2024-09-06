import React, { useState } from "react";
import {
  updateTaskInList,
  deleteTaskFromList,
  toggleTaskCompletion,
} from "../../utils/taskUtils.mjs";
import { deleteTask, updateTask } from "../../utils/apiCalls.js";
import TaskSort from "./TaskSort";
import TaskCard from "./TaskCard";
import { sortTasks } from "../../utils/taskSorting.mjs"; 

const TaskList = ({ tasks, setTasks }) => {
  const [sortCriteria, setSortCriteria] = useState("none");

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks(deleteTaskFromList(tasks, id));
      })
      .catch((error) =>
        console.error("There was an error deleting the task!", error)
      );
  };

  const handleCompletionToggle = (task) => {
    const updatedTask = toggleTaskCompletion(task);

    updateTask(updatedTask)
      .then(() => {
        setTasks(updateTaskInList(tasks, updatedTask));
      })
      .catch((error) =>
        console.error("There was an error updating the task!", error)
      );
  };

  const handleEdit = (updatedTask) => {
    updateTask(updatedTask)
      .then(() => {
        setTasks(updateTaskInList(tasks, updatedTask));
      })
      .catch((error) =>
        console.error("There was an error updating the task!", error)
      );
  };

  const sortedTasks = sortTasks(tasks, sortCriteria);

  return (
    <div
      className="grid-container"
      style={{ marginTop: "30px", alignItems: "start" }}
    >
      <TaskSort sortCriteria={sortCriteria} onSortChange={setSortCriteria} />
      <div className="card-container">
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
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
