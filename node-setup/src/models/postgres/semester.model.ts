import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const semester = (db: Sequelize) => db.define(
  'Semster',
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
      unique: true, // Enforces that each course code is unique
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
