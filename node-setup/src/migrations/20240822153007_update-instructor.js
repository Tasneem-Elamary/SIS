const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn(DepartmentId) => "Instructors"
 *
 */

const info = {
  revision: 3,
  name: 'update-instructor',
  created: '2024-08-22T15:30:07.629Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'changeColumn',
    params: [
      'Instructors',
      'DepartmentId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'Departments', key: 'id' },
        field: 'DepartmentId',
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'changeColumn',
    params: [
      'Instructors',
      'DepartmentId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Departments', key: 'id' },
        field: 'DepartmentId',
        allowNull: false,
      },
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
