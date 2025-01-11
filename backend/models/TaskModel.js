const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do",
  },
  priority: { type: String, enum: ["High", "Medium", "Low"] },
  due_date: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

taskSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const TaskModel = mongoose.model("Task", taskSchema);

module.exports = TaskModel;
