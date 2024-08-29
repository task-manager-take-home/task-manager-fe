import React, { useState, useEffect } from "react";
import TaskList from "./components /TaskList/taskList";
import TaskForm from "./components /InputForm/TaskForm";
import Header from "./components /Header";
import { getTasks } from "./utils/apiCalls";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div className="App">
      <Header />
      <TaskForm addTaskToList={(task) => setTasks([...tasks, task])} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
