import express from "express";
import asyncHandler from "express-async-handler";
import {
  createRole,
  findAllRoles,
  findOneRole,
  updateRoleById,
  updateRole,
  deleteRole,
  deleteAllRoles,
  findAllPublishedRoles,
} from "../controllers/roleController.js";
import createUser from "../controllers/userController.js";
import { createRole as createUserRole } from '../controllers/roleController.js';

const router = express.Router();

// Route for creating a new role
router.post("/", asyncHandler(createRole));

// Route for retrieving all roles
router.get("/", asyncHandler(findAllRoles));

// Route for retrieving a role by ID
router.get("/:id", asyncHandler(findOneRole));

// Route for updating a role (PATCH method)
router.patch("/:id", asyncHandler(updateRoleById));

// Route for updating a role
router.put("/:id", asyncHandler(updateRole));

// Route for deleting a role
router.delete("/:id", asyncHandler(deleteRole));

// Route for deleting all roles
router.delete("/", asyncHandler(deleteAllRoles));

// Route for retrieving all published roles
router.get("/published", asyncHandler(findAllPublishedRoles));

// Route for creating a new user role (assuming you want to create a role for a user)
router.post("/createUserRole", asyncHandler(createUser), asyncHandler(createUserRole));

export default router;
