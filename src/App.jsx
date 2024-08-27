import './App.scss';
import React, {useState} from 'react';
import Header from './components /Header';
import TaskForm from './components /TaskForm';
import TaskList from './components /TaskList';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTaskToList = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="App">
      <Header/>
      <TaskForm addTaskToList={addTaskToList} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
