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
    allowNull: false,
    references: {
      model: 'Students',
      key: 'id',
    },
  },
  ScheduleId: {
    type: DataTypes.UUID,
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
  timestamps: false,

});

export default studentSchedule;
