import { DataTypes, UUIDV4, UUID } from 'sequelize';
import sequelize from '../config/database.config.js';
// import Role from './Role'; // Import the Role model
 
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
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  // roleId: {
  //   type: UUID,
  //   allowNull: false,
  //   references: { model: Role, key: 'id' } // Reference to Role model's id
  // },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active', // Default value 'active'
  },
  property: {
    type: DataTypes.JSON, // Data stored as JSON object
    allowNull: true, // Adjust allowNull as per your requirement
  },
});
 
export default User;
 