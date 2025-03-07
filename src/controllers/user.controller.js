const userService = require("../services/user.service");
const { CreateUserDto, UpdateUserDto } = require("../dto/user.dto");
const { USER_ROLES } = require("../helpers/enums");

exports.createUser = async (req, res, next) => {
  try {
    const userData = new CreateUserDto({
      ...req.body,
      role: req.body.role || USER_ROLES.USER,
    });
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    console.log("Received ID:", req.params.id);
    const user = await userService.getUserById(req.params.id);
    res.json({ message: "User retrieved successfully", user });
  } catch (error) {
    next(error);
  }
};

exports.updateUsersById = async (req, res, next) => {
  try {
    const userData = new UpdateUserDto(req.body);
    const updatedUser = await userService.updateUsersById(
      req.params.id,
      userData
    );
    res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    next(error);
  }
};

exports.deleteUsersById = async (req, res, next) => {
  try {
    console.log("Received ID:", req.params.id);
    await userService.deleteUsersById(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
