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
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Students',
      key: 'id',
    },
  },
  courseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id',
    },
  },
  semsterId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Semsters',
      key: 'id',
    },
  },
  gradeID: {
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
