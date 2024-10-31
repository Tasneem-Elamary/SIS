import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const mappedCourses = (db: Sequelize) => db.define('MappedCourses', {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  BylawCourseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'BylawCourses',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  MappedBylawCourseId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'BylawCourses',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  timestamps: true,
});
export default mappedCourses;
