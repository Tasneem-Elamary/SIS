import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const courseEnrollment = (db: Sequelize) => db.define('CourseEnrollment', {
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
  CourseID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id',
    },
  },
  enrollmentType: {
    type: DataTypes.STRING, // Adjust enum values as necessary
    allowNull: false,
  },
  hasPaidFees: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  registrationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  approvalStatus: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
}, {
  timestamps: false,

});

export default courseEnrollment;
