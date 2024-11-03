const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn(code) => "Courses"
 *
 */

const info = {
  revision: 26,
  name: 'alter-departmentCourse',
  created: '2024-10-29T10:45:22.947Z',
  comment: '',
};

const migrationCommands = (transaction) => [

  // Add foreign key constraint on 'BylawId' in 'DepartmentCourses' table
  {
    fn: 'addConstraint',
    params: [
      'DepartmentCourses',
      {
        fields: ['BylawId'],
        type: 'foreign key',
        name: 'fk_departmentcourses_bylaw', // name of the constraint
        references: {
          table: 'Bylaws',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        transaction,
      },
    ],
  },
];

const rollbackCommands = (transaction) => [

  // Remove foreign key constraint on 'BylawId' in 'DepartmentCourses' table
  {
    fn: 'removeConstraint',
    params: [
      'DepartmentCourses',
      'fk_departmentcourses_bylaw',
      { transaction },
    ],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) => execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) => execute(queryInterface, sequelize, rollbackCommands),
  info,
};
