import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const result = (db: Sequelize) => db.define('Result', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  StudentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Students',
      key: 'id',
    },
  },
  CourseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id',
    },
  },
  SemesterId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Semesters',
      key: 'id',
    },
  },
  GradeId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Grades',
      key: 'id',
    },
  },
  finalGrade: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  midtermGrade: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  courseWork: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },

}, {
  timestamps: false,

});

export default result;
