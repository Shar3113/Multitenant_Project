import bcrypt from "bcryptjs";
import UserModel from "../models/User.js";

export const createUser = async (req, res) => {
  const { name, email, password, tenantid, mobile_number, property } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      name, 
      email,
      password: hashedPassword,
      tenantid,
      mobile_number,
      property,
    };

    const user = await UserModel.create(newUser);

    res.status(201).json({ status: 200, message: "Success", data: user });
  } catch (error) {
    console.log("createUser Error =>", error);
    res.status(500).json({ status: 500, message: "Internal server error." });
  }
};

export const findAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving users.",
    });
  }
};

export const findUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findByPk(id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: `Cannot find User with id=${id}.` });
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving User with id=" + id });
  }
};
export const updateUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const userToUpdate = await UserModel.findByPk(id);

    if (!userToUpdate) {
      return res.status(404).send({
        message: `User with id=${id} not found.`,
      });
    }

    // Update only the provided fields in req.body
    const updatedUser = await userToUpdate.update(req.body);

    res.send({
      message: "User was updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.log("updateUserById Error =>", error);
    res.status(500).send({
      message: "Error updating user with id=" + id,
    });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const userToUpdate = await UserModel.findByPk(id);

    if (!userToUpdate) {
      return res.status(404).send({
        message: `User with id=${id} not found.`,
      });
    }

    const updatedUser = await userToUpdate.update(req.body);

    res.send({
      message: "User was updated successfully.",
      updatedUser,
    });
  } catch (error) {
    console.log("updateUser Error =>", error);
    res.status(500).send({
      message: "Error updating user with id=" + id,
    });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const num = await UserModel.destroy({ where: { id } });
    if (num == 1) {
      res.send({ message: "User was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete User with id=" + id });
  }
};

export const deleteAllUsers = async (req, res) => {
  try {
    const nums = await UserModel.destroy({ where: {}, truncate: false });
    res.send({ message: `${nums} Users were deleted successfully!` });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while removing all users.",
    });
  }
};

export const findAllActiveUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({ where: { status: "active" } });
    res.send(users);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving active users.",
    });
  }
};

export default {
  createUser,
  findAllUsers,
  findUserById,
  updateUserById,
  updateUser,
  deleteUser,
  deleteAllUsers,
  findAllActiveUsers,
};
