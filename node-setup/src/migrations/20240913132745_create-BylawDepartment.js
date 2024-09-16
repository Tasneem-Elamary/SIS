const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn(createdAt) => "BylawCourses"
 * removeColumn(updatedAt) => "BylawCourses"
 * removeColumn(BylawId) => "DepartmentCourses"
 * createTable() => "BylawDepartments", deps: [Departments, Bylaws]
 * addColumn(CourseId) => "DepartmentCourses"
 *
 */

const info = {
  revision: 23,
  name: 'create-BylawDepartment',
  created: '2024-09-13T13:27:45.489Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  // {
  //   fn: "removeColumn",
  //   params: ["BylawCourses", "createdAt", { transaction }],
  // },
  // {
  //   fn: "removeColumn",
  //   params: ["BylawCourses", "updatedAt", { transaction }],
  // },
  {
    fn: 'removeColumn',
    params: ['DepartmentCourses', 'BylawId', { transaction }],
  },
  {
    fn: 'createTable',
    params: [
      'BylawDepartments',
      {
        DepartmentId: {
          type: Sequelize.UUID,
          field: 'DepartmentId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Departments', key: 'id' },
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
  {
    fn: 'addConstraint',
    params: [
      'DepartmentCourses',
      {
        fields: ['CourseId'],
        type: 'foreign key',
        name: 'fk_departmentcourses_course', // Custom name for the FK
        references: {
          table: 'Courses',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        transaction,
      },
    ],
  },
  // Add foreign key constraint on DepartmentId
  {
    fn: 'addConstraint',
    params: [
      'DepartmentCourses',
      {
        fields: ['DepartmentId'],
        type: 'foreign key',
        name: 'fk_departmentcourses_department', // Custom name for the FK
        references: {
          table: 'Departments',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        transaction,
      },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'removeColumn',
    params: ['DepartmentCourses', 'CourseId', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['BylawDepartments', { transaction }],
  },
  {
    fn: 'addColumn',
    params: [
      'BylawCourses',
      'createdAt',
      { type: Sequelize.DATE, field: 'createdAt', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'BylawCourses',
      'updatedAt',
      { type: Sequelize.DATE, field: 'updatedAt', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'DepartmentCourses',
      'BylawId',
      {
        type: Sequelize.UUID,
        field: 'BylawId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Bylaws', key: 'id' },
        primaryKey: true,
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
