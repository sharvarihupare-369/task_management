const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/userRoutes");
const { taskRouter } = require("./routes/tasksRoutes");
const { connection } = require("./config/db");
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Home Route!");
});

app.use("/auth" ,userRouter)
app.use("/tasks",taskRouter)

app.listen(PORT, async() => {
   try {
    await connection;
    console.log("Connected to DB");
   } catch (error) {
    console.log("something went wrong!");
   }
   console.log(`Server is listening on ${PORT}`);
});
