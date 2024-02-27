import { DataTypes, UUIDV4, UUID } from 'sequelize';
import sequelize from '../config/database.config.js';

const Role = sequelize.define('Role', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  property: {
    type: DataTypes.JSONB, 
  },
  permissionData: {
    type: DataTypes.JSONB, 
  },

  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    defaultValue: 'Active',
  },
});

export default Role;
