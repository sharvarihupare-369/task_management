import React from "react";

const TaskList = ({ tasks }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="border p-4 rounded-md mb-2 bg-white shadow"
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
