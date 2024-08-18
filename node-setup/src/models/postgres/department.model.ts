import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { DepartmentType } from '../../types/index';

class Department extends Model<DepartmentType> {}

const DepartmentModel = (sequelize: Sequelize) => {
  Department.init(
  {
      departmentID: {
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
    headID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    facultyID: {
      type: DataTypes.STRING,
      allowNull: false,
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
