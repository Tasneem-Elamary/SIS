import { DataTypes, Sequelize, Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { SectionType } from '../../types/index';

class Section extends Model<SectionType> {}

const SectionModel = (sequelize: Sequelize) => {
  Section.init(
    {
        sectionID: {
        type: DataTypes.UUID,
        defaultValue: uuidv4,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      sectionCode: {
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

  return Section;
};

export default SectionModel;
