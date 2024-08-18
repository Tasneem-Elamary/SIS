import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { StudentType } from '../../types/index';
import UserModel from './user.model';
import DepartmentModel from './department.model';
import BylawModel from './bylaw.model';

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
      profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gainedHours: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      GPA: {
        type: DataTypes.FLOAT,
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
      BylawId: {
        type: DataTypes.UUID,
        allowNull: false,
        
        references: {
          model: BylawModel(sequelize),
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
