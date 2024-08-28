import React, { useState, useEffect } from "react";
import TaskList from "./components /TaskList/taskList";
import TaskForm from "./components /InputForm/TaskForm";
import { getTasks } from "./utils/apiCalls";
import WebrtcConnector from "./utils/WebrtcConnector";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm addTaskToList={(task) => setTasks([...tasks, task])} />
      <TaskList tasks={tasks} setTasks={setTasks} />
      <WebrtcConnector />
    </div>
  );
}

export default App;
