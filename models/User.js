import { DataTypes, UUIDV4, UUID } from 'sequelize';
import sequelize from '../config/database.config.js';
 
const User = sequelize.define('User', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  tenantid: {
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
 
export default User;