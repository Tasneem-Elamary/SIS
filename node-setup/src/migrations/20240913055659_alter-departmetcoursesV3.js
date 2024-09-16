const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn(updatedAt) => "DepartmentCourses"
 * removeColumn(createdAt) => "DepartmentCourses"
 *
 */

const info = {
  revision: 22,
  name: 'alter-departmetcoursesV3',
  created: '2024-09-13T05:56:59.739Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  // Remove the foreign key constraint on BylawId
  {
    fn: 'removeConstraint',
    params: ['DepartmentCourses', 'DepartmentCourses_BylawId_fkey', { transaction }],
  },
  // Alter columns to allow NULL values
  {
    fn: 'changeColumn',
    params: [
      'DepartmentCourses',
      'BylawId',
      {
        type: Sequelize.UUID,
        allowNull: true, // Allow null for BylawId
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'DepartmentCourses',
      'CourseId',
      {
        type: Sequelize.UUID,
        allowNull: true, // Allow null for CourseId
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'DepartmentCourses',
      'DepartmentId',
      {
        type: Sequelize.UUID,
        allowNull: true, // Allow null for DepartmentId
      },
      { transaction },
    ],
  },
  // Add primary key constraint on "id"

];

const rollbackCommands = (transaction) => [
  // Rollback: Remove the primary key constraint on "id"

  // Revert columns to not allow NULL
  {
    fn: 'changeColumn',
    params: [
      'DepartmentCourses',
      'BylawId',
      {
        type: Sequelize.UUID,
        allowNull: false, // Revert to not allow null for BylawId
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'DepartmentCourses',
      'CourseId',
      {
        type: Sequelize.UUID,
        allowNull: false, // Revert to not allow null for CourseId
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'DepartmentCourses',
      'DepartmentId',
      {
        type: Sequelize.UUID,
        allowNull: false, // Revert to not allow null for DepartmentId
      },
      { transaction },
    ],
  },
  // Re-add the foreign key constraint on BylawId
  {
    fn: 'addConstraint',
    params: [
      'DepartmentCourses',
      {
        fields: ['BylawId'],
        type: 'foreign key',
        name: 'DepartmentCourses_BylawId_fkey',
        references: {
          table: 'Bylaws',
          field: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
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
