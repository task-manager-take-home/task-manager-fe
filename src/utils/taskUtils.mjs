// taskUtils.js

export const updateTaskInList = (tasks, updatedTask) => {
    return tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));
  };
  
  export const deleteTaskFromList = (tasks, id) => {
    return tasks.filter((task) => task.id !== id);
  };
  
  export const toggleTaskCompletion = (task) => {
    return {
      ...task,
      status: task.status === "incomplete" ? "complete" : "incomplete",
    };
  };
  