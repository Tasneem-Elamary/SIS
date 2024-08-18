import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { FacultyType } from '../../types/index';

class Faculty extends Model<FacultyType> {}

const FacultyModel = (sequelize: Sequelize) => {
    Faculty.init(
    {
        facultyID: {
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
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      universityID: {
        type: DataTypes.STRING,
        allowNull: false,
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
