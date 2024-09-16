import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { SlotType } from '../types/index';

class Slot extends Model<SlotType> {}

const SlotModel = (sequelize: Sequelize) => {
  Slot.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      day: {
        type: DataTypes.ENUM('Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'),
        allowNull: false,
      },
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,

      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,

      },

    },
    {
      sequelize,
      modelName: 'Slot',
      timestamps: false,
    },
  );

  return Slot;
};

export default SlotModel;
