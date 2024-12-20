const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn(BylawId) => "Students"
 * changeColumn(BylawId) => "Students"
 *
 */

const info = {
  revision: 11,
  name: 'update-student-table',
  created: '2024-08-22T21:46:33.886Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'removeConstraint',
    params: [
      'Students',
      'Students_BylawId_fkey',
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'BylawId',
      { type: Sequelize.UUID, field: 'BylawId', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'BylawId',
      { type: Sequelize.UUID, field: 'BylawId', allowNull: false },
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
