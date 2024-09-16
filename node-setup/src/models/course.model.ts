import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const course = (db: Sequelize) => db.define(
  'Course',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true, // Enforces that each course code is unique
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    min_GPA: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    minEarnedHours: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    creditHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

  return Course;
};

export default CourseModel;
