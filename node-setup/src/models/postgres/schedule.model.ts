import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ScheduleType } from '../../types/index';
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
        type: DataTypes.ENUM('lab', 'lecture'),
        allowNull: false,
      },
      groupId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Groups',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      sectionId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Sections',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      slotId: {
        type: DataTypes.UUID,
        allowNull: false,

        references: {
          model: 'Slots',
          key: 'id',
        },
        onDelete: 'CASCADE',

      },
      roomId: {
        type: DataTypes.UUID,
        allowNull: false,

        references: {
          model: 'Rooms',
          key: 'id',
        },
        onDelete: 'CASCADE',

      },
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,

        references: {
          model: 'Courses',
          key: 'id',
        },
        onDelete: 'CASCADE',

      },
      instructorId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Instructors',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      semesterId: {
        type: DataTypes.UUID,
        allowNull: false,

        references: {
          model: 'Semesters',
          key: 'id',
        },
        onDelete: 'CASCADE',

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
