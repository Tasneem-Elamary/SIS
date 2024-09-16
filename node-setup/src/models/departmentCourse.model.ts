import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const DepartmentCourses = (db: Sequelize) => db.define('DepartmentCourse', {

  CourseId: {
    type: DataTypes.UUID,
    allowNull: true,
    primaryKey: true, // Mark this as part of the composite primary key
  },
  DepartmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    primaryKey: true, // Mark this as part of the composite primary key
  },
  BylawId: {
    type: DataTypes.UUID,
    allowNull: true,
    primaryKey: true, // Mark this as part of the composite primary key
  },
}, {

  timestamps: false,
});

export default DepartmentCourses;
