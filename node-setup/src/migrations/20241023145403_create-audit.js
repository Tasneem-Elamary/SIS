const Sequelize = require('sequelize');

/**
 * Create a migration to add an Audit table.
 */
const info = {
  revision: 26, // increment the revision number
  name: 'create-audit-table',
  created: '2024-10-23T15:30:00.000Z',
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
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        action: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        userId: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        entityIds: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false,
        },
        entityTypes: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false,
        },
        details: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        timestamp: {
          type: Sequelize.DATE,
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
    params: ['Audit', { transaction }],
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
