const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn(code) => "Courses"
 *
 */

const info = {
  revision: 7,
  name: 'update-course-table',
  created: '2024-08-22T21:07:27.483Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'removeConstraint',
    params: ['Courses', 'Courses_code_key1', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['Courses', 'Courses_code_key2', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['Courses', 'Courses_code_key3', { transaction }],
  }, {
    fn: 'removeConstraint',
    params: ['Courses', 'Courses_code_key4', { transaction }],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'addConstraint',
    params: [
      'Courses',
      {
        fields: ['code'],
        type: 'unique',
        name: 'Courses_code_key1',
      },
      { transaction },
    ],
  },
  {
    fn: 'addConstraint',
    params: [
      'Courses',
      {
        fields: ['code'],
        type: 'unique',
        name: 'Courses_code_key2',
      },
      { transaction },
    ],
  },
  {
    fn: 'addConstraint',
    params: [
      'Courses',
      {
        fields: ['code'],
        type: 'unique',
        name: 'Courses_code_key3',
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
