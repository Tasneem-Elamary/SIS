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
        type: DataTypes.STRING,
         
      },
      profilePhoto: {
        type: DataTypes.STRING,
         
      },
      phone: {
        type: DataTypes.STRING,
         
      },
      gainedHours: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue:0,
        
      },
      GPA: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue:0.0,
      },
      UserId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      DepartmentId: {
        type: DataTypes.UUID,
        allowNull: false,
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
          model: 'Bylaws',
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
