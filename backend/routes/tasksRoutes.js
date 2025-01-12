const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const TaskModel = require("../models/TaskModel");
const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    if(!req.body.due_date){
      return res.status(400).send({message:"Due date required!"})
    }
    const task = await TaskModel.create({ ...req.body, userId: userId });
    res.status(200).send({ message: "Task Created Successfully!", task });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const {
      status,
      priority,
      sortBy = "created_at",
      sortOrder = "desc",
    } = req.query;
    const filters = { userId };
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    const tasks = await TaskModel.find(filters).sort({
      [sortBy]: sortOrder === "desc" ? -1 : 1,
    });
    if (!tasks || tasks.length === 0) {
      return res.status(404).send({ message: "No tasks found." });
    }
    res.status(200).send({ tasks });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const task = await TaskModel.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      {
        new: true,
      }
    );
    if (!task) {
      return res.status(404).send({ message: "No task found." });
    }
    res.status(200).send({ message: "Task Updated Successfully!", task });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const task = await TaskModel.findOneAndDelete({ _id: id, userId });
    if (!task) {
      return res.status(404).send({ message: "No task found." });
    }
    res.status(200).send({ message: "Task Deleted Successfully!" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { taskRouter: router };
