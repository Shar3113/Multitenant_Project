import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routers/authRoutes.js';
import tenantRoutes from './routers/tenantRoutes.js';
import setTenantContext from './middleware/tenantMiddleware.js';
import userRoutes from './routers/userRoutes.js';
import sequelize from './config/database.config.js';
 
const app = express();
const PORT = 3000;
 
app.use(bodyParser.json());
 
// app.use('/auth', authRoutes);
// app.use('/:tenantId', setTenantContext, tenantRoutes);
app.use('/user', userRoutes);
 
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });