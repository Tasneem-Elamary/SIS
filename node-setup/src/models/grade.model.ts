import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const grade = (db: Sequelize) => db.define('Grade', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    unique: true,
  },
  letter: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  point: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  BylawId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Bylaws',
      key: 'id',
    },
  },
}, {
  timestamps: false,
});

export default grade;
