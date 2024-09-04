const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn(gender) => "Students"
 *
 */

const info = {
  revision: 17,
  name: 'alter-student',
  created: '2024-09-03T10:45:05.333Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    // Remove the "Students_DepartmentId_fkey" foreign key constraint
    fn: 'removeConstraint',
    params: ['Students', 'Students_DepartmentId_fkey', { transaction }],
  },
  {
    // Remove the "Students_DepartmentId_fkey3" foreign key constraint
    fn: 'removeConstraint',
    params: ['Students', 'Students_DepartmentId_fkey3', { transaction }],
  },
  {
    // Remove the "DepartmentId" column
    fn: 'removeColumn',
    params: ['Students', 'DepartmentId', { transaction }],
  },
  {
    // Re-add the "DepartmentId" column with allowNull: true
    fn: 'addColumn',
    params: [
      'Students',
      'DepartmentId',
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: { model: 'Departments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    // Remove the re-added "DepartmentId" column
    fn: 'removeColumn',
    params: ['Students', 'DepartmentId', { transaction }],
  },
  {
    // Re-add the "DepartmentId" column with allowNull: false
    fn: 'addColumn',
    params: [
      'Students',
      'DepartmentId',
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'Departments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      { transaction },
    ],
  },
  {
    // Re-add the "Students_DepartmentId_fkey" foreign key constraint
    fn: 'addConstraint',
    params: [
      'Students',
      {
        type: 'foreign key',
        name: 'Students_DepartmentId_fkey',
        fields: ['DepartmentId'],
        references: {
          table: 'Departments',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      { transaction },
    ],
  },
  {
    // Re-add the "Students_DepartmentId_fkey3" foreign key constraint
    fn: 'addConstraint',
    params: [
      'Students',
      {
        type: 'foreign key',
        name: 'Students_DepartmentId_fkey3',
        fields: ['DepartmentId'],
        references: {
          table: 'Departments',
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
