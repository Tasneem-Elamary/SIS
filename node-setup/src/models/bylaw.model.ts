import { Sequelize, DataTypes } from 'sequelize';

import { v4 as uuidv4 } from 'uuid';

// Define the Bylaw model
const bylaw = (db: Sequelize) => db.define('Bylaw', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  credit_Hours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  min_GPA: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  min_Hours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  departmentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Departments',
      key: 'id',
    },
  },
}, {
  timestamps: false,

});

export default bylaw;
