const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn(code) => "Courses"
 * createTable() => "Audits", deps: []
 *
 */

const info = {
  revision: 25,
  name: 'create-audit',
  created: '2024-10-23T15:31:08.595Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'createTable',
    params: [
      'Audits',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        action: { type: Sequelize.STRING, field: 'action', allowNull: false },
        userId: { type: Sequelize.STRING, field: 'userId', allowNull: false },
        entityIds: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          field: 'entityIds',
          allowNull: false,
        },
        entityTypes: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          field: 'entityTypes',
          allowNull: false,
        },
        details: { type: Sequelize.TEXT, field: 'details', allowNull: true },
        timestamp: {
          type: Sequelize.DATE,
          field: 'timestamp',
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'dropTable',
    params: ['Audits', { transaction }],
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
