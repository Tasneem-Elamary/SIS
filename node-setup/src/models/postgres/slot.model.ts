import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { SlotType } from '../../types/index';

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
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,

      },
      endTime: {
        type: DataTypes.DATE,
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
