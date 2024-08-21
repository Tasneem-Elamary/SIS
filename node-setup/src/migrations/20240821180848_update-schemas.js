const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * renameColumn(userId) => "Students"
 * renameColumn(departmentId) => "Bylaws"
 * renameColumn(bylawId) => "BylawRules"
 * renameColumn(userId) => "Instructors"
 * renameColumn(departmentId) => "Instructors"
 * renameColumn(groupCode) => "Sections"
 * renameColumn(bylawId) => "Grades"
 * renameColumn(studentId) => "Results"
 * renameColumn(courseId) => "Results"
 * renameColumn(gradeId) => "Results"
 * renameColumn(facultyId) => "Rooms"
 * renameColumn(universityId) => "Faculties"
 * renameColumn(CourseId) => "CoursePrerequisites"
 * renameColumn(PrerequisiteId) => "CoursePrerequisites"
 * removeColumn(departmentID) => "Students"
 * removeColumn(type) => "Schedules"
 * removeColumn(groupID) => "Schedules"
 * removeColumn(sectionID) => "Schedules"
 * removeColumn(slotID) => "Schedules"
 * removeColumn(roomID) => "Schedules"
 * removeColumn(courseID) => "Schedules"
 * removeColumn(instructorID) => "Schedules"
 * removeColumn(semesterID) => "Schedules"
 * removeColumn(SemsterId) => "Schedules"
 * removeColumn(createdAt) => "CourseBylaws"
 * removeColumn(updatedAt) => "CourseBylaws"
 * removeColumn(semsterId) => "Results"
 * dropTable() => "Semsters", deps: []
 * dropTable() => "StudentAdvisor", deps: []
 * dropTable() => "StudentSchedule", deps: []
 * createTable() => "Groups", deps: []
 * createTable() => "Semesters", deps: []
 * createTable() => "BylawCourses", deps: [Courses, Bylaws]
 * createTable() => "StudentAdvisors", deps: [Students, Instructors]
 * createTable() => "StudentSchedules", deps: [Schedules, Students]
 * addColumn(HeadId) => "Departments"
 * addColumn(scheduleType) => "Schedules"
 * addColumn(GroupId) => "Schedules"
 * addColumn(SemesterId) => "Schedules"
 * addColumn(id) => "CourseBylaws"
 * addColumn(isElective) => "CourseBylaws"
 * addColumn(SemesterId) => "Results"
 * addColumn(GradeID) => "Results"
 * addColumn(prerequisiteId) => "CoursePrerequisites"
 * changeColumn(birthDate) => "Students"
 * changeColumn(gender) => "Students"
 * changeColumn(profilePhoto) => "Students"
 * changeColumn(phone) => "Students"
 * changeColumn(gainedHours) => "Students"
 * changeColumn(GPA) => "Students"
 * changeColumn(BylawId) => "Students"
 * changeColumn(headId) => "Departments"
 * changeColumn(birthDate) => "Instructors"
 * changeColumn(profilePhoto) => "Instructors"
 * changeColumn(phone) => "Instructors"
 * changeColumn(SlotId) => "Schedules"
 * changeColumn(RoomId) => "Schedules"
 * changeColumn(InstructorId) => "Schedules"
 * changeColumn(SectionId) => "Schedules"
 * changeColumn(CourseId) => "CourseBylaws"
 * changeColumn(CourseId) => "CourseBylaws"
 * changeColumn(BylawId) => "CourseBylaws"
 * changeColumn(BylawId) => "CourseBylaws"
 *
 */

const info = {
  revision: 2,
  name: 'update-schemas',
  created: '2024-08-21T18:08:48.059Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'renameColumn',
    params: ['Students', 'userId', 'UserId'],
  },
  {
    fn: 'renameColumn',
    params: ['Bylaws', 'departmentId', 'DepartmentId'],
  },
  {
    fn: 'renameColumn',
    params: ['BylawRules', 'bylawId', 'BylawId'],
  },
  {
    fn: 'renameColumn',
    params: ['Instructors', 'userId', 'UserId'],
  },
  {
    fn: 'renameColumn',
    params: ['Instructors', 'departmentId', 'DepartmentId'],
  },
  {
    fn: 'renameColumn',
    params: ['Sections', 'groupCode', 'sectionCode'],
  },
  {
    fn: 'renameColumn',
    params: ['Grades', 'bylawId', 'BylawId'],
  },
  {
    fn: 'renameColumn',
    params: ['Results', 'studentId', 'StudentId'],
  },
  {
    fn: 'renameColumn',
    params: ['Results', 'courseId', 'CourseId'],
  },
  {
    fn: 'renameColumn',
    params: ['Results', 'gradeId', 'GradeId'],
  },
  {
    fn: 'renameColumn',
    params: ['Rooms', 'facultyId', 'FacultyId'],
  },
  {
    fn: 'renameColumn',
    params: ['Faculties', 'universityId', 'UniversityId'],
  },
  {
    fn: 'renameColumn',
    params: ['CoursePrerequisites', 'CourseId', 'courseId'],
  },
  {
    fn: 'renameColumn',
    params: ['CoursePrerequisites', 'PrerequisiteId', 'courseId'],
  },
  {
    fn: 'removeColumn',
    params: ['Students', 'departmentID', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'type', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'groupID', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'sectionID', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'slotID', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'roomID', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'courseID', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'instructorID', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'semesterID', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'SemsterId', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['CourseBylaws', 'createdAt', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['CourseBylaws', 'updatedAt', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Results', 'semsterId', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Semsters', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['StudentAdvisor', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['StudentSchedule', { transaction }],
  },
  {
    fn: 'createTable',
    params: [
      'Groups',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        groupCode: {
          type: Sequelize.STRING,
          field: 'groupCode',
          allowNull: false,
        },
        capacity: {
          type: Sequelize.INTEGER,
          field: 'capacity',
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Semesters',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        season: {
          type: Sequelize.STRING,
          field: 'season',
          unique: true,
          allowNull: false,
        },
        creditHours: {
          type: Sequelize.INTEGER,
          field: 'creditHours',
          allowNull: false,
        },
        year: { type: Sequelize.INTEGER, field: 'year', allowNull: false },
      },
      { transaction },
    ],
  },
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
  {
    fn: 'createTable',
    params: [
      'StudentAdvisors',
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
        StudentId: {
          type: Sequelize.UUID,
          field: 'StudentId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Students', key: 'id' },
          primaryKey: true,
        },
        InstructorId: {
          type: Sequelize.UUID,
          field: 'InstructorId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Instructors', key: 'id' },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'StudentSchedules',
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
        ScheduleId: {
          type: Sequelize.UUID,
          field: 'ScheduleId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Schedules', key: 'id' },
          primaryKey: true,
        },
        StudentId: {
          type: Sequelize.UUID,
          field: 'StudentId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Students', key: 'id' },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Departments',
      'HeadId',
      {
        type: Sequelize.UUID,
        field: 'HeadId',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'Instructors', key: 'id' },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'scheduleType',
      { type: Sequelize.STRING, field: 'scheduleType', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'GroupId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        field: 'GroupId',
        onDelete: 'CASCADE',
        references: { model: 'Groups', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'SemesterId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        field: 'SemesterId',
        onDelete: 'CASCADE',
        references: { model: 'Semesters', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'CourseBylaws',
      'id',
      {
        type: Sequelize.UUID,
        field: 'id',
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'CourseBylaws',
      'isElective',
      { type: Sequelize.BOOLEAN, field: 'isElective', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Results',
      'SemesterId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'SemesterId',
        references: { model: 'Semesters', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Results',
      'GradeID',
      {
        type: Sequelize.UUID,
        field: 'GradeID',
        references: { model: 'Grades', key: 'id' },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'CoursePrerequisites',
      'prerequisiteId',
      {
        type: Sequelize.UUID,
        field: 'prerequisiteId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Courses', key: 'id' },
        primaryKey: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'birthDate',
      { type: Sequelize.DATE, field: 'birthDate' },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'gender',
      { type: Sequelize.ENUM('male', 'female'), field: 'gender' },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'profilePhoto',
      { type: Sequelize.STRING, field: 'profilePhoto' },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'phone',
      { type: Sequelize.STRING, field: 'phone' },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'gainedHours',
      {
        type: Sequelize.FLOAT,
        field: 'gainedHours',
        defaultValue: 0,
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'GPA',
      {
        type: Sequelize.FLOAT,
        field: 'GPA',
        defaultValue: 0,
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'BylawId',
      {
        type: Sequelize.UUID,
        field: 'BylawId',
        onDelete: 'CASCADE',
        references: { model: 'Bylaws', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Departments',
      'headId',
      {
        type: Sequelize.UUID,
        field: 'headId',
        onDelete: 'CASCADE',
        references: { model: 'Instructors', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Instructors',
      'birthDate',
      { type: Sequelize.DATE, field: 'birthDate' },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Instructors',
      'profilePhoto',
      { type: Sequelize.STRING, field: 'profilePhoto' },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Instructors',
      'phone',
      { type: Sequelize.STRING, field: 'phone' },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Schedules',
      'SlotId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        field: 'SlotId',
        onDelete: 'CASCADE',
        references: { model: 'Slots', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Schedules',
      'RoomId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        field: 'RoomId',
        onDelete: 'CASCADE',
        references: { model: 'Rooms', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Schedules',
      'InstructorId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        field: 'InstructorId',
        onDelete: 'CASCADE',
        references: { model: 'Instructors', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Schedules',
      'SectionId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        field: 'SectionId',
        onDelete: 'CASCADE',
        references: { model: 'Sections', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'CourseBylaws',
      'CourseId',
      {
        type: Sequelize.UUID,
        field: 'CourseId',
        references: { model: 'Courses', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'CourseBylaws',
      'CourseId',
      {
        type: Sequelize.UUID,
        field: 'CourseId',
        references: { model: 'Courses', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'CourseBylaws',
      'BylawId',
      {
        type: Sequelize.UUID,
        field: 'BylawId',
        references: { model: 'Bylaws', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'CourseBylaws',
      'BylawId',
      {
        type: Sequelize.UUID,
        field: 'BylawId',
        references: { model: 'Bylaws', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: 'renameColumn',
    params: ['Students', 'UserId', 'userId'],
  },
  {
    fn: 'renameColumn',
    params: ['Instructors', 'UserId', 'userId'],
  },
  {
    fn: 'renameColumn',
    params: ['Instructors', 'DepartmentId', 'departmentId'],
  },
  {
    fn: 'renameColumn',
    params: ['Faculties', 'UniversityId', 'universityId'],
  },
  {
    fn: 'renameColumn',
    params: ['Sections', 'sectionCode', 'groupCode'],
  },
  {
    fn: 'renameColumn',
    params: ['Bylaws', 'DepartmentId', 'departmentId'],
  },
  {
    fn: 'renameColumn',
    params: ['BylawRules', 'BylawId', 'bylawId'],
  },
  {
    fn: 'renameColumn',
    params: ['Grades', 'BylawId', 'bylawId'],
  },
  {
    fn: 'renameColumn',
    params: ['Results', 'StudentId', 'studentId'],
  },
  {
    fn: 'renameColumn',
    params: ['Results', 'CourseId', 'courseId'],
  },
  {
    fn: 'renameColumn',
    params: ['Results', 'GradeId', 'gradeId'],
  },
  {
    fn: 'renameColumn',
    params: ['Rooms', 'FacultyId', 'facultyId'],
  },
  {
    fn: 'renameColumn',
    params: ['CoursePrerequisites', 'courseId', 'CourseId'],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'scheduleType', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'GroupId', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Schedules', 'SemesterId', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Departments', 'HeadId', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['CourseBylaws', 'id', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['CourseBylaws', 'isElective', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Results', 'SemesterId', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['Results', 'GradeID', { transaction }],
  },
  {
    fn: 'removeColumn',
    params: ['CoursePrerequisites', 'prerequisiteId', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Groups', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Semesters', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['BylawCourses', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['StudentAdvisors', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['StudentSchedules', { transaction }],
  },
  {
    fn: 'createTable',
    params: [
      'Semsters',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        season: {
          type: Sequelize.ENUM('Winter', 'spring', 'fall', 'summer'),
          field: 'season',
          unique: true,
          allowNull: false,
        },
        creditHours: {
          type: Sequelize.INTEGER,
          field: 'creditHours',
          allowNull: false,
        },
        year: { type: Sequelize.INTEGER, field: 'year', allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'StudentAdvisor',
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
        StudentId: {
          type: Sequelize.UUID,
          field: 'StudentId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Students', key: 'id' },
          primaryKey: true,
        },
        InstructorId: {
          type: Sequelize.UUID,
          field: 'InstructorId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Instructors', key: 'id' },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'StudentSchedule',
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
        ScheduleId: {
          type: Sequelize.UUID,
          field: 'ScheduleId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Schedules', key: 'id' },
          primaryKey: true,
        },
        StudentId: {
          type: Sequelize.UUID,
          field: 'StudentId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Students', key: 'id' },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Students',
      'departmentID',
      {
        type: Sequelize.UUID,
        field: 'departmentID',
        onDelete: 'CASCADE',
        references: { model: 'Departments', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'type',
      {
        type: Sequelize.ENUM('lab', 'lecture'),
        field: 'type',
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'groupID',
      {
        type: Sequelize.UUID,
        field: 'groupID',
        onDelete: 'CASCADE',
        references: { model: 'Sections', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'sectionID',
      {
        type: Sequelize.UUID,
        field: 'sectionID',
        onDelete: 'CASCADE',
        references: { model: 'Sections', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'slotID',
      { type: Sequelize.UUID, field: 'slotID', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'roomID',
      { type: Sequelize.UUID, field: 'roomID', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'courseID',
      { type: Sequelize.UUID, field: 'courseID', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'instructorID',
      {
        type: Sequelize.UUID,
        field: 'instructorID',
        onDelete: 'CASCADE',
        references: { model: 'Instructors', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'semesterID',
      { type: Sequelize.UUID, field: 'semesterID', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Schedules',
      'SemsterId',
      {
        type: Sequelize.UUID,
        field: 'SemsterId',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'Semsters', key: 'id' },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'CourseBylaws',
      'createdAt',
      { type: Sequelize.DATE, field: 'createdAt', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'CourseBylaws',
      'updatedAt',
      { type: Sequelize.DATE, field: 'updatedAt', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'Results',
      'semsterId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'semsterId',
        references: { model: 'Semsters', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'addColumn',
    params: [
      'CoursePrerequisites',
      'PrerequisiteId',
      {
        type: Sequelize.UUID,
        field: 'PrerequisiteId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Courses', key: 'id' },
        primaryKey: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'birthDate',
      { type: Sequelize.DATE, field: 'birthDate', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'gender',
      { type: Sequelize.STRING, field: 'gender', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'profilePhoto',
      { type: Sequelize.STRING, field: 'profilePhoto', allowNull: true },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'phone',
      { type: Sequelize.STRING, field: 'phone', allowNull: true },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'gainedHours',
      { type: Sequelize.FLOAT, field: 'gainedHours', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'GPA',
      { type: Sequelize.FLOAT, field: 'GPA', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Students',
      'BylawId',
      { type: Sequelize.UUID, field: 'BylawId', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Instructors',
      'birthDate',
      { type: Sequelize.DATE, field: 'birthDate', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Instructors',
      'profilePhoto',
      { type: Sequelize.STRING, field: 'profilePhoto', allowNull: true },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Instructors',
      'phone',
      { type: Sequelize.STRING, field: 'phone', allowNull: false },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Schedules',
      'SectionId',
      {
        type: Sequelize.UUID,
        field: 'SectionId',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'Sections', key: 'id' },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Schedules',
      'SlotId',
      {
        type: Sequelize.UUID,
        field: 'SlotId',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'Slots', key: 'id' },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Schedules',
      'RoomId',
      {
        type: Sequelize.UUID,
        field: 'RoomId',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'Rooms', key: 'id' },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Schedules',
      'InstructorId',
      {
        type: Sequelize.UUID,
        field: 'InstructorId',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        references: { model: 'Instructors', key: 'id' },
        allowNull: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'Departments',
      'headId',
      {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        field: 'headId',
        onDelete: 'CASCADE',
        references: { model: 'Instructors', key: 'id' },
        allowNull: false,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'CourseBylaws',
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
  {
    fn: 'changeColumn',
    params: [
      'CourseBylaws',
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
  {
    fn: 'changeColumn',
    params: [
      'CourseBylaws',
      'CourseId',
      {
        type: Sequelize.UUID,
        field: 'CourseId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Courses', key: 'id' },
        primaryKey: true,
      },
      { transaction },
    ],
  },
  {
    fn: 'changeColumn',
    params: [
      'CourseBylaws',
      'CourseId',
      {
        type: Sequelize.UUID,
        field: 'CourseId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'Courses', key: 'id' },
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
