import { Sequelize, DataTypes, Model } from 'sequelize';

import { v4 as uuidv4 } from 'uuid';
import { BylawType } from '../types';

// Define the Bylaw model
class Bylaw extends Model<BylawType> { }
const BylawModel = (sequelize: Sequelize) => {
  Bylaw.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      credit_Hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      min_GPA: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      min_Hours: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

    },
    {
      sequelize,
      timestamps: false,
      modelName: 'Bylaw',

    },
  );
  return Bylaw;
};

export default BylawModel;
