import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { GroupType } from '../types/index';

class Group extends Model<GroupType> {}

const GroupModel = (sequelize: Sequelize) => {
  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      groupCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Section',
      timestamps: false,
    },
  );

  return Group;
};

export default GroupModel;
