const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn(level) => "Students"
 * removeColumn(createdAt, updatedAt) => "CoursePrerequisites"
 * addForeignKey(courseId) => "CoursePrerequisites"
 * addForeignKey(prerequisiteId) => "CoursePrerequisites"
 *
 */

const info = {
  revision: 18,
  name: 'alter-coursePrerequisites',
  created: '2024-09-09T10:24:41.195Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'addColumn',
    params: [
      'Students',
      'level',
      { type: Sequelize.INTEGER, field: 'level', allowNull: true },
      { transaction },
    ],
  },
  {
    fn: 'removeColumn',
    params: ['CoursePrerequisites', 'createdAt', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['CoursePrerequisites', 'updatedAt', { transaction }],
  },
  {
    fn: 'addConstraint',
    params: [
      'CoursePrerequisites',
      {
        fields: ['courseId'],
        type: 'foreign key',
        name: 'fk_courseId',
        references: {
          table: 'Courses', // Assuming the table name is "Courses"
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      },
    ],
  },
  {
    fn: 'addConstraint',
    params: [
      'CoursePrerequisites',
      {
        fields: ['prerequisiteId'],
        type: 'foreign key',
        name: 'fk_prerequisiteId',
        references: {
          table: 'Courses', // Assuming the prerequisite courses are in the same "Courses" table
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
        transaction,
      },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'removeColumn',
    params: ['Students', 'level', { transaction }],
  },
  {
    fn: 'addColumn',
    params: [
      'CoursePrerequisites',
      'createdAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        transaction,
      },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'CoursePrerequisites',
      'updatedAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        transaction,
      },
    ],
  },
  {
    fn: 'removeConstraint',
    params: ['CoursePrerequisites', 'fk_courseId', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['CoursePrerequisites', 'fk_prerequisiteId', { transaction }],
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
