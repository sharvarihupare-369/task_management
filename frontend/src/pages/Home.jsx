import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);

  // useEffect(() => {
  //   const fetchTasks = async () => {
  //     try {
  //       const response = await fetch("/api/tasks");
  //       const data = await response.json();
  //       setTasks(data);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //     }
  //   };

  //   fetchTasks();
  // }, []);

  return (
    <>
      <Navbar onCreateTaskClick={() => setShowTaskForm(true)} />
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onTaskCreated={(newTask) => console.log("New Task Created:", newTask)}
        />
      )}
      <div className="p-4">
        <TaskList tasks={tasks} />
      </div>
    </>
  );
};

export default Home;
