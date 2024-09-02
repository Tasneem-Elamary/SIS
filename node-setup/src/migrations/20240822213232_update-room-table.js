const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn(code) => "Rooms"
 *
 */

const info = {
  revision: 9,
  name: 'update-room-table',
  created: '2024-08-22T21:32:32.454Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'removeConstraint',
    params: ['Rooms', 'Rooms_code_key1', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['Rooms', 'Rooms_code_key2', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['Rooms', 'Rooms_code_key3', { transaction }],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'addConstraint',
    params: [
      'Rooms',
      {
        fields: ['code'],
        type: 'unique',
        name: 'Rooms_code_key1',
      },
      { transaction },
    ],
  },
  {
    fn: 'addConstraint',
    params: [
      'Rooms',
      {
        fields: ['code'],
        type: 'unique',
        name: 'Rooms_code_key2',
      },
      { transaction },
    ],
  },
  {
    fn: 'addConstraint',
    params: [
      'Rooms',
      {
        fields: ['code'],
        type: 'unique',
        name: 'Rooms_code_key3',
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
