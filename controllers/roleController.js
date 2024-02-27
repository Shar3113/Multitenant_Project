import RoleModel from "../models/role.js";

export const createRole = async (req, res) => {
  const { title, property, status } = req.body;

  try {
    const newRole = {
      title,
      property,
      status: status || "Active", // default to 'Active' if status is not provided
    };

    const role = await RoleModel.create(newRole);

    res.status(201).json({ status: 200, message: "Success", data: role });
  } catch (error) {
    console.log("createRole Error =>", error);
    res.status(500).json({ status: 500, message: "Internal server error." });
  }
};

export const findAllRoles = async (req, res) => {
  try {
    const roles = await RoleModel.findAll();
    res.send(roles);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while retrieving roles.",
    });
  }
};

export const findOneRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await RoleModel.findByPk(id);
    if (role) {
      res.send(role);
    } else {
      res.status(404).send({ message: `Cannot find Role with id=${id}.` });
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving Role with id=" + id });
  }
};

export const updateRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const roleToUpdate = await RoleModel.findByPk(id);

    if (!roleToUpdate) {
      return res.status(404).send({
        message: `Role with id=${id} not found.`,
      });
    }

    // Update only the provided fields in req.body
    const updatedRole = await roleToUpdate.update(req.body);

    res.send({
      message: "Role was updated successfully.",
      updatedRole,
    });
  } catch (error) {
    console.log("updateRoleById Error =>", error);
    res.status(500).send({
      message: "Error updating role with id=" + id,
    });
  }
};

export const updateRole = async (req, res) => {
  const { id } = req.params;

  try {
    const roleToUpdate = await RoleModel.findByPk(id);

    if (!roleToUpdate) {
      return res.status(404).send({
        message: `Role with id=${id} not found.`,
      });
    }

    const updatedRole = await roleToUpdate.update(req.body);

    res.send({
      message: "Role was updated successfully.",
      updatedRole,
    });
  } catch (error) {
    console.log("updateRole Error =>", error);
    res.status(500).send({
      message: "Error updating role with id=" + id,
    });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const num = await RoleModel.destroy({ where: { id } });
    if (num == 1) {
      res.send({ message: "Role was deleted successfully!" });
    } else {
      res.send({
        message: `Cannot delete Role with id=${id}. Maybe Role was not found!`,
      });
    }
  } catch (error) {
    res.status(500).send({ message: "Could not delete Role with id=" + id });
  }
};

export const deleteAllRoles = async (req, res) => {
  try {
    const nums = await RoleModel.destroy({ where: {}, truncate: false });
    res.send({ message: `${nums} Roles were deleted successfully!` });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while removing all roles.",
    });
  }
};

export const findAllPublishedRoles = async (req, res) => {
  try {
    const roles = await RoleModel.findAll({ where: { published: true } });
    res.send(roles);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while retrieving published roles.",
    });
  }
};

export default {
  createRole,
  findAllRoles,
  findOneRole,
  updateRoleById,
  updateRole,
  deleteRole,
  deleteAllRoles,
  findAllPublishedRoles,
};
