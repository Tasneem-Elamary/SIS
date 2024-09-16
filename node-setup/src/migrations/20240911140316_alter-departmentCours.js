const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn(BylawId) => "Departments"
 * removeColumn(CourseId) => "DepartmentCourses"
 * addColumn(BylawId) => "DepartmentCourses"
 *
 */

const info = {
  revision: 21, // Update the revision number
  name: 'alter-departmentCourses',
  created: '2024-09-11T14:03:16.019Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  // Remove "createdAt" and "updatedAt" from "DepartmentCourses"
  {
    fn: 'removeColumn',
    params: ['DepartmentCourses', 'createdAt', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['DepartmentCourses', 'updatedAt', { transaction }],
  },
  {
    fn: 'removeConstraint',
    params: ['Departments', 'Departments_BylawId_fkey', { transaction }],
  },

  // Remove "BylawId" and its foreign key constraint from "Departments"
  {
    fn: 'removeColumn',
    params: ['Departments', 'BylawId', { transaction }],
  },

  // Remove the composite primary key constraint from "DepartmentCourses"
  {
    fn: 'removeConstraint',
    params: ['DepartmentCourses', 'DepartmentCourses_pkey', { transaction }],
  },

  {
    fn: 'addColumn',
    params: [
      'DepartmentCourses',
      'BylawId',
      {
        type: Sequelize.UUID,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Bylaws', key: 'id' }, // Foreign key to Bylaws
      },
      { transaction },
    ],
  },

  // Add new "id" column to "DepartmentCourses" as the primary key
  {
    fn: 'addColumn',
    params: [
      'DepartmentCourses',
      'id',
      {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, // Automatically generate UUID
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  // Re-add the "createdAt" and "updatedAt" columns in "DepartmentCourses"
  {
    fn: 'addColumn',
    params: [
      'DepartmentCourses',
      'createdAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'DepartmentCourses',
      'updatedAt',
      {
        type: Sequelize.DATE,
        allowNull: false,
      },
      { transaction },
    ],
  },

  // Re-add "BylawId" column and constraint in "Departments"
  {
    fn: 'addColumn',
    params: [
      'Departments',
      'BylawId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Bylaws', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },

  // Re-add the composite primary key constraint in "DepartmentCourses"
  {
    fn: 'addConstraint',
    params: [
      'DepartmentCourses',
      {
        type: 'primaryKey',
        fields: ['CourseId', 'DepartmentId'], // Original composite key
        name: 'DepartmentCourses_pkey',
      },
      { transaction },
    ],
  },

  // Re-add the foreign key constraint for "BylawId" in "Departments"
  {
    fn: 'addConstraint',
    params: [
      'Departments',
      {
        type: 'foreign key',
        fields: ['BylawId'],
        name: 'Departments_BylawId_fkey',
        references: {
          table: 'Bylaws',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
