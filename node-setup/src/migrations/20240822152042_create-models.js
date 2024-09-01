const Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable() => "Users", deps: []
 * createTable() => "Universities", deps: []
 * createTable() => "Sections", deps: []
 * createTable() => "Groups", deps: []
 * createTable() => "Slots", deps: []
 * createTable() => "Courses", deps: []
 * createTable() => "CourseBylaws", deps: []
 * createTable() => "Semesters", deps: []
 * createTable() => "Faculties", deps: [Universities]
 * createTable() => "Instructors", deps: [Users, Departments]
 * createTable() => "Rooms", deps: [Faculties]
 * createTable() => "Departments", deps: [Instructors, Faculties]
 * createTable() => "Students", deps: [Users, Departments]
 * createTable() => "Bylaws", deps: [Departments]
 * createTable() => "BylawRules", deps: [Bylaws]
 * createTable() => "Grades", deps: [Bylaws]
 * createTable() => "CourseEnrollments", deps: [Students, Courses]
 * createTable() => "Results", deps: [Students, Courses, Semesters, Grades]
 * createTable() => "Schedules", deps: [Groups, Sections, Slots, Rooms, Instructors, Semesters]
 * createTable() => "CoursePrerequisites", deps: [Courses, Courses]
 * createTable() => "BylawCourses", deps: [Courses, Bylaws]
 * createTable() => "DepartmentCourses", deps: [Courses, Departments]
 * createTable() => "StudentAdvisors", deps: [Students, Instructors]
 * createTable() => "StudentSchedules", deps: [Schedules, Students]
 *
 */

const info = {
  revision: 1,
  name: 'create-models',
  created: '2024-08-22T15:20:42.412Z',
  comment: '',
};

const migrationCommands = (transaction) => [
  {
    fn: 'createTable',
    params: [
      'Users',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          field: 'email',
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          field: 'password',
          allowNull: false,
        },
        role: { type: Sequelize.STRING, field: 'role', allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Universities',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        universityCode: {
          type: Sequelize.STRING,
          field: 'universityCode',
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: 'name', allowNull: false },
        location: {
          type: Sequelize.STRING,
          field: 'location',
          allowNull: false,
        },
        phone: { type: Sequelize.STRING, field: 'phone', allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Sections',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        sectionCode: {
          type: Sequelize.STRING,
          field: 'sectionCode',
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
      'Slots',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        startTime: {
          type: Sequelize.DATE,
          field: 'startTime',
          allowNull: false,
        },
        endTime: { type: Sequelize.DATE, field: 'endTime', allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Courses',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        code: {
          type: Sequelize.STRING,
          field: 'code',
          unique: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: 'name', allowNull: false },
        creditHours: {
          type: Sequelize.INTEGER,
          field: 'creditHours',
          allowNull: false,
        },
      },
      { transaction },
    ],
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
      'Faculties',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        facultyCode: {
          type: Sequelize.STRING,
          field: 'facultyCode',
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: 'name', allowNull: false },
        location: {
          type: Sequelize.STRING,
          field: 'location',
          allowNull: false,
        },
        phone: { type: Sequelize.STRING, field: 'phone', allowNull: false },
        UniversityId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Universities', key: 'id' },
          field: 'UniversityId',
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Instructors',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        firstName: {
          type: Sequelize.STRING,
          field: 'firstName',
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          field: 'lastName',
          allowNull: false,
        },
        birthDate: { type: Sequelize.DATE, field: 'birthDate' },
        gender: {
          type: Sequelize.ENUM('Male', 'Female'),
          field: 'gender',
          allowNull: false,
        },
        type: { type: Sequelize.STRING, field: 'type', allowNull: false },
        employmentType: {
          type: Sequelize.STRING,
          field: 'employmentType',
          allowNull: false,
        },
        profilePhoto: { type: Sequelize.STRING, field: 'profilePhoto' },
        phone: { type: Sequelize.STRING, field: 'phone' },
        UserId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Users', key: 'id' },
          field: 'UserId',
          allowNull: false,
        },
        DepartmentId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Departments', key: 'id' },
          allowNull: true,
          field: 'DepartmentId',
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Rooms',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        code: {
          type: Sequelize.STRING,
          field: 'code',
          unique: true,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM('section', 'lab', 'hall'),
          field: 'type',
          allowNull: false,
        },
        capacity: {
          type: Sequelize.INTEGER,
          field: 'capacity',
          allowNull: false,
        },
        FacultyId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Faculties', key: 'id' },
          field: 'FacultyId',
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Departments',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        departmentCode: {
          type: Sequelize.STRING,
          field: 'departmentCode',
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: 'name', allowNull: false },
        HeadId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Instructors', key: 'id' },
          field: 'HeadId',
          allowNull: false,
        },
        FacultyId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Faculties', key: 'id' },
          field: 'FacultyId',
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Students',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        studentCode: {
          type: Sequelize.STRING,
          field: 'studentCode',
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          field: 'firstName',
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          field: 'lastName',
          allowNull: false,
        },
        birthDate: { type: Sequelize.DATE, field: 'birthDate' },
        gender: { type: Sequelize.ENUM('male', 'female'), field: 'gender' },
        profilePhoto: { type: Sequelize.STRING, field: 'profilePhoto' },
        phone: { type: Sequelize.STRING, field: 'phone' },
        gainedHours: {
          type: Sequelize.FLOAT,
          field: 'gainedHours',
          defaultValue: 0,
          allowNull: false,
        },
        GPA: {
          type: Sequelize.FLOAT,
          field: 'GPA',
          defaultValue: 0,
          allowNull: false,
        },
        UserId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Users', key: 'id' },
          field: 'UserId',
          allowNull: false,
        },
        DepartmentId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Departments', key: 'id' },
          field: 'DepartmentId',
          allowNull: false,
        },
        BylawId: { type: Sequelize.UUID, field: 'BylawId', allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Bylaws',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        code: { type: Sequelize.STRING(10), field: 'code', allowNull: false },
        year: { type: Sequelize.INTEGER, field: 'year', allowNull: false },
        credit_Hours: {
          type: Sequelize.INTEGER,
          field: 'credit_Hours',
          allowNull: false,
        },
        min_GPA: { type: Sequelize.FLOAT, field: 'min_GPA', allowNull: false },
        min_Hours: {
          type: Sequelize.INTEGER,
          field: 'min_Hours',
          allowNull: false,
        },
        DepartmentId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Departments', key: 'id' },
          field: 'DepartmentId',
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'BylawRules',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        min_GPA: { type: Sequelize.FLOAT, field: 'min_GPA', allowNull: false },
        hoursAllowed: {
          type: Sequelize.INTEGER,
          field: 'hoursAllowed',
          allowNull: false,
        },
        BylawId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Bylaws', key: 'id' },
          field: 'BylawId',
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Grades',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          unique: true,
          primaryKey: true,
        },
        letter: {
          type: Sequelize.ENUM(
            'A+',
            'A',
            'A-',
            'B+',
            'B',
            'B-',
            'C+',
            'C',
            'C-',
            'D+',
            'D',
            'D-',
            'F',
          ),
          field: 'letter',
          allowNull: false,
        },
        point: { type: Sequelize.FLOAT, field: 'point', allowNull: false },
        BylawId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Bylaws', key: 'id' },
          field: 'BylawId',
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'CourseEnrollments',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        StudentId: {
          type: Sequelize.UUID,
          field: 'StudentId',
          allowNull: false,
        },
        CourseID: { type: Sequelize.UUID, field: 'CourseID', allowNull: false },
        enrollmentType: {
          type: Sequelize.ENUM('regular', 'selfstudy', 'overload'),
          field: 'enrollmentType',
          allowNull: false,
        },
        hasPaidFees: {
          type: Sequelize.BOOLEAN,
          field: 'hasPaidFees',
          defaultValue: false,
        },
        registrationDate: {
          type: Sequelize.DATE,
          field: 'registrationDate',
          defaultValue: Sequelize.NOW,
          allowNull: false,
        },
        approvalStatus: {
          type: Sequelize.ENUM('Approved', 'pending', 'unApproved'),
          field: 'approvalStatus',
          defaultValue: 'pending',
        },
        studentId: {
          type: Sequelize.UUID,
          field: 'studentId',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'Students', key: 'id' },
          allowNull: true,
        },
        CourseId: {
          type: Sequelize.UUID,
          field: 'CourseId',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'Courses', key: 'id' },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Results',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        StudentId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Students', key: 'id' },
          field: 'StudentId',
          allowNull: false,
        },
        CourseId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Courses', key: 'id' },
          field: 'CourseId',
          allowNull: false,
        },
        SemesterId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Semesters', key: 'id' },
          field: 'SemesterId',
          allowNull: false,
        },
        GradeID: { type: Sequelize.UUID, field: 'GradeID', allowNull: true },
        finalGrade: {
          type: Sequelize.FLOAT,
          field: 'finalGrade',
          allowNull: true,
        },
        midtermGrade: {
          type: Sequelize.FLOAT,
          field: 'midtermGrade',
          allowNull: true,
        },
        courseWork: {
          type: Sequelize.FLOAT,
          field: 'courseWork',
          allowNull: true,
        },
        GradeId: {
          type: Sequelize.UUID,
          field: 'GradeId',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          references: { model: 'Grades', key: 'id' },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Schedules',
      {
        id: {
          type: Sequelize.UUID,
          field: 'id',
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        scheduleType: {
          type: Sequelize.STRING,
          field: 'scheduleType',
          allowNull: false,
        },
        GroupId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Groups', key: 'id' },
          field: 'GroupId',
          allowNull: false,
        },
        SectionId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Sections', key: 'id' },
          field: 'SectionId',
          allowNull: false,
        },
        SlotId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Slots', key: 'id' },
          field: 'SlotId',
          allowNull: false,
        },
        RoomId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Rooms', key: 'id' },
          field: 'RoomId',
          allowNull: false,
        },
        CourseId: { type: Sequelize.UUID, field: 'CourseId', allowNull: false },
        InstructorId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Instructors', key: 'id' },
          field: 'InstructorId',
          allowNull: false,
        },
        SemesterId: {
          type: Sequelize.UUID,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Semesters', key: 'id' },
          field: 'SemesterId',
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'CoursePrerequisites',
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
        courseId: {
          type: Sequelize.UUID,
          field: 'courseId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Courses', key: 'id' },
          primaryKey: true,
        },
        prerequisiteId: {
          type: Sequelize.UUID,
          field: 'prerequisiteId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Courses', key: 'id' },
          primaryKey: true,
        },
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
      'DepartmentCourses',
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
        DepartmentId: {
          type: Sequelize.UUID,
          field: 'DepartmentId',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          references: { model: 'Departments', key: 'id' },
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
];

const rollbackCommands = (transaction) => [
  {
    fn: 'dropTable',
    params: ['Users', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Students', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Instructors', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Schedules', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Departments', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Faculties', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Universities', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Sections', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Groups', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Slots', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Courses', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Bylaws', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['BylawRules', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Grades', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['CourseEnrollments', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['CourseBylaws', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Results', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Semesters', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['Rooms', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['CoursePrerequisites', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['BylawCourses', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['DepartmentCourses', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['StudentAdvisors', { transaction }],
  },
  {
    fn: 'dropTable',
    params: ['StudentSchedules', { transaction }],
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
