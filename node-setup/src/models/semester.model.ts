import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const semester = (db: Sequelize) => db.define(
  'Semester',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    season: {
      type: DataTypes.ENUM('Winter', 'spring', 'fall', 'summer'),
      allowNull: false,
    },
    creditHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

export default semester;
