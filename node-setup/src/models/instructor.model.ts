import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { InstructorType } from '../types/index';

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

      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female'),
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

      },
      phone: {
        type: DataTypes.STRING,

      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        // references: {
        //   model: 'User',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',
      },
      DepartmentId: {
        type: DataTypes.UUID,
        allowNull: true,
        // references: {
        //   model: 'Department',
        //   key: 'id',
        // },
        // onDelete: 'CASCADE',
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
