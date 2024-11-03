import { v4 as uuidv4 } from 'uuid';
import { DataTypes, Sequelize } from 'sequelize';

const courseBylaw = (db: Sequelize) => db.define(
  'BylawDepartment',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    BylawId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Bylaws',
        key: 'id',
      },
    },
    DepaertmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Departments',
        key: 'id',
      },
    },

  },
  {
    timestamps: false,
  },
);

export default courseBylaw;
