import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { ScheduleType } from '../../types/index';
import GroupModel from './group.model';
import SectionModel from './section.model';
import InstructorModel from './instructor.model';
// import CourseModel from './course.model';
// import SlotModel from './slot.model';
// import RoomModel from './room.model';
// import SemesterModel from './semester.model';

class Schedule extends Model<ScheduleType> {}

const ScheduleModel = (sequelize: Sequelize) => {
  Schedule.init(
    {
      scheduleID: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('lab', 'lecture'),
        allowNull: false,
      },
      groupID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: GroupModel(sequelize),
          key: 'groupID',
        },
        onDelete: 'CASCADE',
      },
      sectionID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: SectionModel(sequelize),
          key: 'sectionID',
        },
        onDelete: 'CASCADE',
      },
      slotID: {
        type: DataTypes.UUID,
        allowNull: false,
        /**
        references: {
          model: SlotModel(sequelize),
          key: 'slotID',
        },
        onDelete: 'CASCADE',
         */
      },
      roomID: {
        type: DataTypes.UUID,
        allowNull: false,
        /**
        references: {
          model: RoomModel(sequelize),
          key: 'roomID',
        },
        onDelete: 'CASCADE',
        */
      },
      courseID: {
        type: DataTypes.UUID,
        allowNull: false,
        /**
        references: {
          model: CourseModel(sequelize),
          key: 'courseID',
        },
       onDelete: 'CASCADE',
        */

      },
      instructorID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: InstructorModel(sequelize),
          key: 'instructorID',
        },
        onDelete: 'CASCADE',
      },
      semesterID: {
        type: DataTypes.UUID,
        allowNull: false,
        /**
        references: {
          model: SemesterModel(sequelize),
          key: 'semesterID',
        },
        onDelete: 'CASCADE',
        */
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
