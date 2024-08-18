import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { DepartmentType } from '../../types/index';
import FacultyModel from './faculty.model';
import InstructorModel from './instructor.model';

class Department extends Model<DepartmentType> {}

const DepartmentModel = (sequelize: Sequelize) => {
  Department.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      departmentCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      headId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: InstructorModel(sequelize),
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      facultyId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: FacultyModel(sequelize),
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Department',
      timestamps: false,
    },
  );

  return Department;
};

export default DepartmentModel;
