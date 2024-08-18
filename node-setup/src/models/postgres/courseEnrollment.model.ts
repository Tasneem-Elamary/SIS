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
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Students',
      key: 'id',
    },
  },
  courseID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id',
    },
  },
  enrollmentType: {
    type: DataTypes.ENUM('regular', 'selfstudy', 'overload'), // Adjust enum values as necessary
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
    type: DataTypes.ENUM('Approved', 'pending', 'unApproved'),
    defaultValue: false,
  },
}, {
  timestamps: false,

});

export default courseEnrollment;
