import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { StudentType } from '../types/index';

class Student extends Model<StudentType> {}

const StudentModel = (sequelize: Sequelize) => {
  Student.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      studentCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      birthDate: {
        type: DataTypes.DATE,

      },
      gender: {
        type: DataTypes.ENUM('male', 'female'),

      },
      profilePhoto: {
        type: DataTypes.STRING,

      },
      phone: {
        type: DataTypes.STRING,

      },
      gainedHours: {
        type: DataTypes.FLOAT,
        defaultValue: 0,

      },
      GPA: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0,
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      DepartmentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'Departments',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      BylawId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Bylaw',
          key: 'id',
        },
        onDelete: 'CASCADE',

      },
    },
    {
      sequelize,
      modelName: 'Student',
      timestamps: false,
    },
  );

  return Student;
};

export default StudentModel;
