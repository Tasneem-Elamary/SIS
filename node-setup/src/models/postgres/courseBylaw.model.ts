import { DataTypes, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { Bylaw,Course } from '.';

const courseBylaw = (db: Sequelize) => db.define('CourseBylaw', {
    id: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        primaryKey: true,
        unique: true,
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
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Courses', 
          key: 'id', 
        },
      },
  isElective: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
           
},
},
{            
  timestamps: false,     
});

export default courseBylaw;