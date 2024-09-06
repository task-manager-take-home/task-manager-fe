export const sortTasks = (tasks, sortCriteria) => {
    if (sortCriteria === "completed") {
      return tasks.filter((task) => task.status === "complete");
    } else if (sortCriteria === "incomplete") {
      return tasks.filter((task) => task.status === "incomplete");
    } else if (sortCriteria === "priority") {
      return [...tasks].sort((a, b) => {
        if (a.priority === b.priority) return 0;
        return a.priority === "immediate" ? -1 : 1;
      });
    }
    return tasks;
  };
  