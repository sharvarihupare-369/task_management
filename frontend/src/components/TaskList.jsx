import React, { useEffect, useState } from "react";
import { deleteTask, getAllTasks } from "../utils/http";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskList = ({ tasks, onTaskEdit, onTaskDelete }) => {
  const token = localStorage.getItem("token") || "";
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmation) {
      const response = await deleteTask(id, token);
      if (response && response.message === "Task Deleted Successfully!") {
        toast.success("Task deleted successfully!");
        onTaskDelete(id);
      } else {
        toast.error(response || "Failed to delete task.");
      }
    }
  };

  if (tasks.length === 0) {
    return <p className="text-2xl font-bold">No tasks found</p>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <div>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <div
              key={task._id}
              className={`border capitalize  p-4 rounded-md mb-2 ${
                task.status === "Completed" ? "bg-green-100" : "bg-white"
              } shadow`}
            >
              <h3 className="text-lg font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>
                <strong>Status:</strong> {task.status}
              </p>
              <p>
                <strong>Priority:</strong> {task.priority}
              </p>
              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(task.due_date).toLocaleDateString()}
              </p>
              <div className="flex gap-2 mt-4 justify-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() => onTaskEdit(task)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TaskList;
