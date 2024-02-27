// tenantUserRoutes.js
import express from 'express';
import asyncHandler from 'express-async-handler';
import { createTenant } from '../controllers/tenantController.js';
import createUser from '../controllers/userController.js';
// import { createRole } from '../controllers/roleController.js';
import roleController from '../controllers/roleController.js';
const { createRole } = roleController;

const router = express.Router();

router.route('/')
  .post(asyncHandler(createTenant), asyncHandler(createUser));

// Add a new route for creating a role along with tenant and user
router.route('/createRole')
  .post(asyncHandler(createTenant), asyncHandler(createUser), asyncHandler(createRole));

export default router;
