const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable() => "BylawCourses", deps: []
 *
 */

const info = {
  revision: 4,
  name: 'drop-bylawcources-table',
  created: '2024-08-22T20:08:25.733Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'dropTable',
    params: ['BylawCourses', { transaction }],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'createTable',
    params: [
      'BylawCourses',
      {
        createdAt: {
          type: Sequelize.DATE,
          field: 'createdAt',
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: 'updatedAt',
          allowNull: false,
        },
        CourseId: {
          type: Sequelize.UUID,
          field: 'CourseId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Courses', key: 'id' },
          primaryKey: true,
        },
        BylawId: {
          type: Sequelize.UUID,
          field: 'BylawId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Bylaws', key: 'id' },
          primaryKey: true,
        },
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
