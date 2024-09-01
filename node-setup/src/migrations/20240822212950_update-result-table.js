const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn(GradeID) => "Results"
 *
 */

const info = {
  revision: 8,
  name: 'update-result-table',
  created: '2024-08-22T21:29:50.921Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'removeColumn',
    params: ['Results', 'GradeID', { transaction }],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'addColumn',
    params: [
      'Results',
      'GradeID',
      {
        type: Sequelize.UUID,
        allowNull: true,
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
