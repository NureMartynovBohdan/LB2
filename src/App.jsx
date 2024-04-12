// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './App.css'; // Assuming you have an App.css for styles

// function App() {
//   const [tasks, setTasks] = useState([]);
//   const [taskInput, setTaskInput] = useState('');

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   // const fetchTasks = async () => {
//   //   const response = await axios.get('http://localhost:5000/tasks');
//   //   setTasks(response.data.data);
//   // };

//   const fetchTasks = async () => {
//     console.log("Fetching tasks...");
//     try {
//       const response = await axios.get('http://localhost:5000/tasks');
//       console.log("Tasks fetched:", response.data.data);
//       setTasks(response.data.data);
//     } catch (error) {
//       console.error("Failed to fetch tasks:", error);
//     }
//   };
  

//   const addTask = async () => {
//     if (!taskInput.trim()) return; 
//     await axios.post('http://localhost:5000/tasks', { description: taskInput });
//     setTaskInput('');
//     fetchTasks();
//   };

//   const deleteTask = async (id) => {
//     await axios.delete(`http://localhost:5000/tasks/${id}`);
//     fetchTasks();
//   };

//   return (
//     <div className="app">
//       <header>
//         <h1>Task Manager</h1>
//       </header>
//       <input
//         type="text"
//         value={taskInput}
//         onChange={(e) => setTaskInput(e.target.value)}
//         placeholder="Add a new task"
//         className="task-input"
//       />
//       <button onClick={addTask} className="add-button">Add Task</button>
//       <div className="task-list">
//         {tasks.map(task => (
//           <div key={task.id} className="task-item">
//             {task.description}
//             <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5001/tasks');
    setTasks(response.data.data);
  };

  const addTask = async () => {
    if (!taskInput.trim()) return;
    await axios.post('http://localhost:5001/tasks', { description: taskInput });
    setTaskInput('');
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5001/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.description}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
