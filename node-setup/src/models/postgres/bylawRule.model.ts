import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Bylaw,Course } from '.';

const bylawRule = (db: Sequelize) => db.define('BylawRule', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      min_GPA: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      hoursAllowed: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    bylawId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Bylaws', 
          key: 'id', 
        },
      },
     
},
{            
  timestamps: false,     
});

export default bylawRule;