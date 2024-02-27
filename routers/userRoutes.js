import express from "express";
import asyncHandler from "express-async-handler";
import {
  createUser,
  findAllUsers,
  findUserById,
  updateUserById,
  updateUser,
  deleteUser,
  deleteAllUsers,
  findAllActiveUsers,
} from "../controllers/userController.js";
import { createTenant } from "../controllers/tenantController.js";

const router = express.Router();

// Route for creating a new user
router.post("/", asyncHandler(createTenant), asyncHandler(createUser));

// Route for retrieving all users
router.get("/", asyncHandler(findAllUsers));

// Route for retrieving a user by ID
router.get("/:id", asyncHandler(findUserById));

// Route for updating a user (PATCH method)
router.patch("/:id", asyncHandler(updateUserById));

// Route for updating a user
router.put("/:id", asyncHandler(updateUser));

// Route for deleting a user
router.delete("/:id", asyncHandler(deleteUser));

// Route for deleting all users
router.delete("/", asyncHandler(deleteAllUsers));

// Route for retrieving all active users
router.get("/active", asyncHandler(findAllActiveUsers));

export default router;
