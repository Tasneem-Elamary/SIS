import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const room = (db: Sequelize) => db.define(
  'Room',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    type: {
      type: DataTypes.ENUM('section', 'lab', 'hall'),
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FacultyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Faculties',
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
  },
);

export default room;
