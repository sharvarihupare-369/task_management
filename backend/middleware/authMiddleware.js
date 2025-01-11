const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/BlackListModel");
const UserModel = require("../models/UserModel");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req?.headers["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({ message: "Access denied. No token provided" });
    }
    const isTokenBlacklisted = await BlackListModel.findOne({ token });
    if (isTokenBlacklisted) {
      return res.status(400).send({ message: "Token is already blacklisted" });
    }
    const decoded = jwt.verify(token, process.env.secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = authMiddleware;
