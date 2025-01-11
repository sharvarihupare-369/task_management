const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const BlackListModel = require("../models/BlackListModel");
const validationMiddleware = require("../middleware/validationMiddleware");
const router = express.Router();

router.post("/register", validationMiddleware, async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      ...req.body,
      password: hashedPassword,
    });
    res.status(200).send({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .send({ message: "User does not exist. Please register first." });
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.secretKey,
      { expiresIn: "7d" }
    );
    res.status(200).send({
      message: "User loggedIn successfully",
      token: token,
      username: existingUser.name,
    });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const token = req?.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res.status(400).send({ message: "No token provided" });
    }
    const existingToken = await BlackListModel.findOne({ token });
    if (existingToken) {
      return res.status(400).send({ message: "Token is already blacklisted" });
    }
    const blacklistedToken = await BlackListModel.create({ token });
    res.status(200).send({ message: "User loggeded Out successfully" });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = { userRouter: router };
