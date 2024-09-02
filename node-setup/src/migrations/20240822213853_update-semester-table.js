const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn(season) => "Semesters"
 *
 */

const info = {
  revision: 10,
  name: 'update-semester-table',
  created: '2024-08-22T21:38:53.418Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'removeConstraint',
    params: ['Semesters', 'Semesters_season_key', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['Semesters', 'Semesters_season_key1', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['Semesters', 'Semesters_season_key2', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['Semesters', 'Semesters_season_key3', { transaction }],
  },
  {
    fn: 'changeColumn',
    params: [
      'Semesters',
      'season',
      {
        type: Sequelize.ENUM('Winter', 'spring', 'fall', 'summer'),
        field: 'season',
        allowNull: false,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'changeColumn',
    params: [
      'Semesters',
      'season',
      {
        type: Sequelize.STRING,
        field: 'season',
        unique: true,
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
