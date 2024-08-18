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
      id: {
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
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      sectionID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: SectionModel(sequelize),
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      slotID: {
        type: DataTypes.UUID,
        allowNull: false,
        /**
        references: {
          model: SlotModel(sequelize),
          key: 'id',
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
          key: 'id',
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
          key: 'id',
        },
       onDelete: 'CASCADE',
        */

      },
      instructorID: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: InstructorModel(sequelize),
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      semesterID: {
        type: DataTypes.UUID,
        allowNull: false,
        /**
        references: {
          model: SemesterModel(sequelize),
          key: 'id',
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
