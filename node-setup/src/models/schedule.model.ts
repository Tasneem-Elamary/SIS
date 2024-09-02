import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ScheduleType } from '../types/index';
import GroupModel from './group.model';
import SectionModel from './section.model';
import InstructorModel from './instructor.model';
import CourseModel from './course.model';
import SlotModel from './slot.model';
import RoomModel from './room.model';
import SemesterModel from './semester.model';

class Schedule extends Model<ScheduleType> {}

const ScheduleModel = (sequelize: Sequelize) => {
  Schedule.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      scheduleType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      GroupId: {
        type: DataTypes.UUID,
        allowNull: false,
        // references: {
        //   model: 'Group',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',
      },
      SectionId: {
        type: DataTypes.UUID,
        allowNull: false,
        // references: {
        //   model: 'Section',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',
      },
      SlotId: {
        type: DataTypes.UUID,
        allowNull: false,

        // references: {
        //   model: 'Slot',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',

      },
      RoomId: {
        type: DataTypes.UUID,
        allowNull: false,

        // references: {
        //   model: 'Room',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',

      },
      CourseId: {
        type: DataTypes.UUID,
        allowNull: false,

        // references: {
        //   model: 'Course',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',

      },
      InstructorId: {
        type: DataTypes.UUID,
        allowNull: false,
        // references: {
        //   model: 'Instructor',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',
      },
      SemesterId: {
        type: DataTypes.UUID,
        allowNull: false,

        // references: {
        //   model: 'Semester',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',

      },
    },
    {
      sequelize,
      modelName: 'Schedule',
      timestamps: false,
    },
  );

  return Schedule;
};

export default ScheduleModel;
