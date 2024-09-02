const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn(CourseID) => "CourseEnrollments"
 * removeConstraint(CourseEnrollments_CourseId_fkey1) => "CourseEnrollments"
 * removeConstraint(CourseEnrollments_CourseId_fkey2) => "CourseEnrollments"
 * changeColumn(CourseId) => "CourseEnrollments"
 *
 */

const info = {
  revision: 6,
  name: 'update-courseEnrollment-table',
  created: '2024-08-22T20:50:35.417Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'removeColumn',
    params: ['CourseEnrollments', 'CourseID', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['CourseEnrollments', 'CourseEnrollments_CourseId_fkey1', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['CourseEnrollments', 'CourseEnrollments_CourseId_fkey2', { transaction }],
  },
  // {
  //   fn: "changeColumn",
  //   params: [
  //     "CourseEnrollments",
  //     "CourseId",
  //     {
  //       type: Sequelize.UUID,
  //       onUpdate: "CASCADE",
  //       onDelete: "CASCADE",
  //       references: { model: "Courses", key: "id" },
  //       field: "CourseId",
  //       allowNull: false,
  //     },
  //     { transaction },
  //   ],
  // },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'addColumn',
    params: [
      'CourseEnrollments',
      'CourseID',
      { type: Sequelize.UUID, field: 'CourseID', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addConstraint',
    params: [
      'CourseEnrollments',
      {
        fields: ['CourseId'],
        type: 'foreign key',
        name: 'CourseEnrollments_CourseId_fkey1',
        references: {
          table: 'Courses',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addConstraint',
    params: [
      'CourseEnrollments',
      {
        fields: ['CourseId'],
        type: 'foreign key',
        name: 'CourseEnrollments_CourseId_fkey2',
        references: {
          table: 'Courses',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'CourseEnrollments',
      'CourseId',
      {
        type: Sequelize.UUID,
        field: 'CourseId',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'Courses', key: 'id' },
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
