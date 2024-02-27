/// controllers/roleController.js
import RoleModel from "../models/role.js";
import { Op } from "sequelize";
// import bcrypt from "bcryptjs";

export const createRole = async (req, res) => {
  const { title, property, status } = req.body;

  try {
    const newRole = {
      title: title,
      property: property,
      status: status || "Active", // default to 'Active' if status is not provided
    };

    const role = await RoleModel.create(newRole);

    res.status(201).json({ status: 200, message: "Success", data: role });
  } catch (error) {
    console.log("createRole Error =>", error);
    res.status(500).json({ status: 500, message: "Internal server error." });
  }
};

export const findAllRoles = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  RoleModel.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};

export const findOneRole = (req, res) => {
  const id = req.params.id;

  RoleModel.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Role with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Role with id=" + id,
      });
    });
};

export const deleteRole = (req, res) => {
  const id = req.params.id;

  RoleModel.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Role was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id,
      });
    });
};

export const deleteAllRoles = (req, res) => {
  RoleModel.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Roles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all roles.",
      });
    });
};

export const findAllPublishedRoles = (req, res) => {
  RoleModel.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving roles.",
      });
    });
};

export default {
  createRole,
  findAllRoles,
  findOneRole,
  deleteRole,
  deleteAllRoles,
  findAllPublishedRoles,
};
