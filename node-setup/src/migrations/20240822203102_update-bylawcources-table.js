const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable() => "CourseBylaws", deps: []
 * createTable() => "BylawCourses", deps: [Courses, Bylaws]
 *
 */

const info = {
  revision: 5,
  name: 'update-bylawcources-table',
  created: '2024-08-22T20:31:02.208Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'dropTable',
    params: ['CourseBylaws', { transaction }],
  },
  {
    fn: 'createTable',
    params: [
      'BylawCourses',
      {

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
        isElective: {
          type: Sequelize.BOOLEAN,
          allowNull: false,

        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'dropTable',
    params: ['BylawCourses', { transaction }],
  },
  {
    fn: 'createTable',
    params: [
      'CourseBylaws',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        BylawId: { type: Sequelize.UUID, field: 'BylawId', allowNull: false },
        CourseId: { type: Sequelize.UUID, field: 'CourseId', allowNull: false },
        isElective: {
          type: Sequelize.BOOLEAN,
          field: 'isElective',
          allowNull: false,
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
