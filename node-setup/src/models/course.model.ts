import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const CourseModel = (sequelize: Sequelize) => {
  const Course = sequelize.define(
    'Course',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      creditHours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        // allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return Course;
};

export default CourseModel;
