// tenantMiddleware.js
 import  Tenant from '../models/Tenant.js';
 const setTenantContext = async (req, res, next) => {
  const {tenantId}  = req.params;
  try {
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found.' });
    }
    req.tenant = tenant;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
export default setTenantContext;
 
