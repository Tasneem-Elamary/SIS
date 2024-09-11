import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const courseBylaw = (db: Sequelize) => db.define(
  'BylawCourse',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    BylawId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Bylaws',
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
    isElective: {
      type: DataTypes.BOOLEAN,
      allowNull: false,

    },
  },
  {
    timestamps: false,
  },
);

export default courseBylaw;
