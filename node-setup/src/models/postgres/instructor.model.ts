import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { InstructorType } from '../../types/index';
import UserModel from './user.model';
import DepartmentModel from './department.model';

class Instructor extends Model<InstructorType> {}

const InstructorModel = (sequelize: Sequelize) => {
  Instructor.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4, // Correct usage
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      employmentType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: UserModel(sequelize),
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      departmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: DepartmentModel(sequelize),
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Instructor',
      timestamps: false,
    },
  );

  return Instructor;
};

export default InstructorModel;
