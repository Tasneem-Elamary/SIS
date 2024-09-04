const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * renameColumn(firstName) => "Students"
 * renameColumn(lastName) => "Students"
 * removeColumn(DepartmentId) => "Bylaws"
 * removeColumn(id) => "CourseEnrollments"
 * removeColumn(enrollmentType) => "CourseEnrollments"
 * removeColumn(hasPaidFees) => "CourseEnrollments"
 * removeColumn(registrationDate) => "CourseEnrollments"
 * removeColumn(approvalStatus) => "CourseEnrollments"
 * removeColumn(studentId) => "CourseEnrollments"
 * addColumn(BylawId) => "Departments"
 * addColumn(createdAt) => "CourseEnrollments"
 * addColumn(updatedAt) => "CourseEnrollments"
 * changeColumn(gainedHours) => "Students"
 * changeColumn(GPA) => "Students"
 * changeColumn(UserId) => "Students"
 * changeColumn(DepartmentId) => "Students"
 * changeColumn(BylawId) => "Students"
 * changeColumn(HeadId) => "Departments"
 * changeColumn(StudentId) => "CourseEnrollments"
 * changeColumn(StudentId) => "CourseEnrollments"
 * changeColumn(StudentId) => "CourseEnrollments"
 * changeColumn(CourseId) => "CourseEnrollments"
 *
 */

const info = {
  revision: 13,
  name: 'alter-studentAdvisors',
  created: '2024-09-03T07:28:44.458Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    // Rename `firstName` to `name` in the `Students` table
    fn: 'renameColumn',
    params: ['Students', 'firstName', 'name'],
  },
  {
    // Remove `lastName` from the `Students` table
    fn: 'removeColumn',
    params: ['Students', 'lastName', { transaction }],
  },
  {
    // Remove `DepartmentId` from the `Bylaws` table
    fn: 'removeColumn',
    params: ['Bylaws', 'DepartmentId', { transaction }],
  },
  {
    // Remove `createdAt` from the `StudentAdvisors` table
    fn: 'removeColumn',
    params: ['StudentAdvisors', 'createdAt', { transaction }],
  },
  {
    // Remove `updatedAt` from the `StudentAdvisors` table
    fn: 'removeColumn',
    params: ['StudentAdvisors', 'updatedAt', { transaction }],
  },
  {
    // Add `BylawId` to the `Departments` table
    fn: 'addColumn',
    params: [
      'Departments',
      'BylawId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        field: 'BylawId',
        onDelete: 'CASCADE',
        references: { model: 'Bylaws', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    // Rename `name` back to `firstName` in the `Students` table
    fn: 'renameColumn',
    params: ['Students', 'name', 'firstName'],
  },
  {
    // Re-add `lastName` to the `Students` table
    fn: 'addColumn',
    params: [
      'Students',
      'lastName',
      { type: Sequelize.STRING, allowNull: false },
      { transaction },
    ],
  },
  {
    // Re-add `DepartmentId` to the `Bylaws` table
    fn: 'addColumn',
    params: [
      'Bylaws',
      'DepartmentId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Departments', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    // Re-add `createdAt` to the `StudentAdvisors` table
    fn: 'addColumn',
    params: [
      'StudentAdvisors',
      'createdAt',
      { type: Sequelize.DATE, allowNull: false },
      { transaction },
    ],
  },
  {
    // Re-add `updatedAt` to the `StudentAdvisors` table
    fn: 'addColumn',
    params: [
      'StudentAdvisors',
      'updatedAt',
      { type: Sequelize.DATE, allowNull: false },
      { transaction },
    ],
  },
  {
    // Remove `BylawId` from the `Departments` table
    fn: 'removeColumn',
    params: ['Departments', 'BylawId', { transaction }],
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
