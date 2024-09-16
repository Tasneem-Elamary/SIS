const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn(level) => "Courses"
 * addColumn(min_GPA) => "Courses"
 * addColumn(minEarnedHours) => "Courses"
 *
 */

const info = {
  revision: 19,
  name: 'alter-course',
  created: '2024-09-11T11:09:08.684Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'addColumn',
    params: [
      'Courses',
      'level',
      { type: Sequelize.INTEGER, field: 'level', allowNull: true },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Courses',
      'min_GPA',
      { type: Sequelize.FLOAT, field: 'min_GPA', allowNull: true },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Courses',
      'minEarnedHours',
      { type: Sequelize.INTEGER, field: 'minEarnedHours', allowNull: true },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'removeColumn',
    params: ['Courses', 'level', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Courses', 'min_GPA', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Courses', 'minEarnedHours', { transaction }],
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
