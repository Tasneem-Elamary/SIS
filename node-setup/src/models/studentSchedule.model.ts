import { Sequelize, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const studentSchedule = (db: Sequelize) => db.define('StudentSchedule', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  StudentId: {
    type: DataTypes.UUID,
    // primaryKey: true,
    allowNull: false,
    references: {
      model: 'Students',
      key: 'id',
    },
  },
  ScheduleId: {
    type: DataTypes.UUID,
    // primaryKey: true,
    allowNull: false,
    references: {
      model: 'Schedules',
      key: 'id',
    },
  },
  approvalStatus: {
    type: DataTypes.ENUM('pending', 'approved'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'StudentSchedules',
  timestamps: true,
});

export default studentSchedule;
