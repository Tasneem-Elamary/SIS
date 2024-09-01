import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { FacultyType } from '../types/index';
import UniversityModel from './university.model';

class Faculty extends Model<FacultyType> {}

const FacultyModel = (sequelize: Sequelize) => {
  Faculty.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      facultyCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UniversityId: {
        type: DataTypes.UUID,
        allowNull: false,
        // references: {
        //   model: 'University',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Faculty',
      timestamps: false,
    },
  );

  return Faculty;
};

export default FacultyModel;
