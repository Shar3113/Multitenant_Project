import { DataTypes, UUIDV4, UUID } from 'sequelize';
import sequelize from '../config/database.config.js';
 
const Tenant = sequelize.define('Tenant', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
 
export default Tenant;