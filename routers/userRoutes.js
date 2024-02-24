import express from 'express';
import asyncHandler from 'express-async-handler';
import  createUser  from '../controllers/userController.js';
import {createTenant}  from '../controllers/tenantController.js';
 
const router = express.Router();
 
router.route('/')
  .post(asyncHandler(createTenant), asyncHandler(createUser));
 
export default router;