import express from 'express';
import { getAllTenants } from '../controllers/tenantController.js';
import authMiddleware from '../middleware/authMiddleware.js';
 
const router = express.Router(); 
router.use(authMiddleware);
router.get('/tenants', getAllTenants);
 
export default router;
