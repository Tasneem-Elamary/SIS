import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const DepartmentCourses = (db: Sequelize) => db.define('DepartmentCourse', {

  CourseId: {
    type: DataTypes.UUID,
    allowNull: true,
    primaryKey: true, // Mark this as part of the composite primary key
    references: {
      model: 'Courses',
      key: 'id',
    },
  },
  DepartmentId: {
    type: DataTypes.UUID,
    allowNull: true,
    primaryKey: true, // Mark this as part of the composite primary key
    references: {
      model: 'Departments',
      key: 'id',
    },
  },
  BylawId: {
    type: DataTypes.UUID,
    allowNull: true,
    primaryKey: true,
    references: {
      model: 'Bylaws',
      key: 'id',
    },
  },
}, {

  timestamps: false,
});

export default DepartmentCourses;
