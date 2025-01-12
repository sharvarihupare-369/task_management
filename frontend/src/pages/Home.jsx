import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import { getAllTasks } from "../utils/http";
import EditTaskForm from "../components/EditTaskFrom";

const Home = () => {
  const token = localStorage.getItem("token") || "";
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    sortBy: "created_at",
    sortOrder: "desc",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const fetchedTasks = await getAllTasks(token, queryParams);
        setTasks(fetchedTasks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [token, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleTaskCreated = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    setShowTaskForm(false);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
    setTaskToEdit(null);
  };

  const handleTaskDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  return (
    <>
      {/* <Navbar onCreateTaskClick={() => setShowTaskForm(true)} />
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}
      {taskToEdit && (
        <EditTaskForm
          task={taskToEdit}
          onClose={() => setTaskToEdit(null)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
      <div className="p-4">
      <TaskList
          tasks={tasks}
          onTaskEdit={(task) => setTaskToEdit(task)} 
          onTaskDelete={handleTaskDelete} 
        />
      </div> */}
      <Navbar onCreateTaskClick={() => setShowTaskForm(true)} />
      {showTaskForm && (
        <TaskForm
          onClose={() => setShowTaskForm(false)}
          onTaskCreated={handleTaskCreated}
        />
      )}
      {taskToEdit && (
        <EditTaskForm
          task={taskToEdit}
          onClose={() => setTaskToEdit(null)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
      <div className="p-4">
        <div className="mb-4">
          <div className="flex space-x-4">
            {/* Status Filter */}
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            >
              <option value="">All Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            {/* Priority Filter */}
            <select
              name="priority"
              value={filters.priority}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            >
              <option value="">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {/* Sorting */}
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            >
              <option value="created_at">Created At</option>
            </select>
            <select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleFilterChange}
              className="p-2 border rounded"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
        </div>
        <TaskList
          tasks={tasks}
          onTaskEdit={(task) => setTaskToEdit(task)}
          onTaskDelete={handleTaskDelete}
        />
      </div>
    </>
  );
};

export default Home;
