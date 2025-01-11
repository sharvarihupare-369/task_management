const UserModel = require("../models/UserModel");

const validationMiddleware = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User with this email already exists!" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .send({ message: "Password should be minimum of 8 character length" });
    }
    if (!/[A-Z]/.test(password)) {
      return res
        .status(400)
        .send({
          message: "Password should contain at list one uppercase character",
        });
    }
    if (!/[0-9]/.test(password)) {
      return res
        .status(400)
        .send({ message: "Password should contain at list one number" });
    }
    if (!/[!@#$%^*]/.test(password)) {
      return res.status(400).send({
        message: "Password should contain at list one special character",
      });
    }
    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = validationMiddleware;
