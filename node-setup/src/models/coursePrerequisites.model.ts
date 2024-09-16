import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const coursePrerequisites = (db: Sequelize) => db.define(
  'CoursePrerequisite',
  {
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true, // Set as part of the composite primary key
      references: {
        model: 'Course', // Correct table name, ensure no extra spaces
        key: 'id',
      },
    },
    prerequisiteId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true, // Set as part of the composite primary key
      references: {
        model: 'Course', // Correct table name, ensure no extra spaces
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    // This ensures Sequelize won't pluralize the table name
  },
);

export default coursePrerequisites;
