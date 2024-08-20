const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "Users", deps: []
 * createTable() => "Courses", deps: []
 * createTable() => "Universities", deps: []
 * createTable() => "Sections", deps: []
 * createTable() => "Slots", deps: []
 * createTable() => "Semsters", deps: []
 * createTable() => "Faculties", deps: [Universities]
 * createTable() => "Instructors", deps: [Users, Departments]
 * createTable() => "Departments", deps: [Instructors, Faculties]
 * createTable() => "Students", deps: [Users, Departments, Departments]
 * createTable() => "Bylaws", deps: [Departments]
 * createTable() => "BylawRules", deps: [Bylaws]
 * createTable() => "Grades", deps: [Bylaws]
 * createTable() => "CourseEnrollments", deps: [Courses, Students]
 * createTable() => "CourseBylaws", deps: [Courses, Bylaws]
 * createTable() => "Results", deps: [Students, Courses, Semsters, Grades]
 * createTable() => "Rooms", deps: [Faculties]
 * createTable() => "Schedules", deps: [Sections, Sections, Instructors, Slots, Rooms, Instructors, Semsters, Sections]
 * createTable() => "StudentAdvisor", deps: [Students, Instructors]
 * createTable() => "StudentSchedule", deps: [Schedules, Students]
 * createTable() => "CoursePrerequisites", deps: [Courses, Courses]
 * createTable() => "DepartmentCourses", deps: [Courses, Departments]
 *
 */

const info = {
  revision: 1,
  name: "create-models",
  created: "2024-08-20T19:28:26.659Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "Users",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          field: "email",
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING,
          field: "password",
          allowNull: false,
        },
        role: { type: Sequelize.STRING, field: "role", allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Courses",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        code: {
          type: Sequelize.STRING,
          field: "code",
          unique: true,
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        creditHours: {
          type: Sequelize.INTEGER,
          field: "creditHours",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Universities",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        universityCode: {
          type: Sequelize.STRING,
          field: "universityCode",
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        location: {
          type: Sequelize.STRING,
          field: "location",
          allowNull: false,
        },
        phone: { type: Sequelize.STRING, field: "phone", allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Sections",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        groupCode: {
          type: Sequelize.STRING,
          field: "groupCode",
          allowNull: false,
        },
        capacity: {
          type: Sequelize.INTEGER,
          field: "capacity",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Slots",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        startTime: {
          type: Sequelize.DATE,
          field: "startTime",
          allowNull: false,
        },
        endTime: { type: Sequelize.DATE, field: "endTime", allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Semsters",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        season: {
          type: Sequelize.ENUM("Winter", "spring", "fall", "summer"),
          field: "season",
          unique: true,
          allowNull: false,
        },
        creditHours: {
          type: Sequelize.INTEGER,
          field: "creditHours",
          allowNull: false,
        },
        year: { type: Sequelize.INTEGER, field: "year", allowNull: false },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Faculties",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        facultyCode: {
          type: Sequelize.STRING,
          field: "facultyCode",
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        location: {
          type: Sequelize.STRING,
          field: "location",
          allowNull: false,
        },
        phone: { type: Sequelize.STRING, field: "phone", allowNull: false },
        universityId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          field: "universityId",
          onDelete: "CASCADE",
          references: { model: "Universities", key: "id" },
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Instructors",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        firstName: {
          type: Sequelize.STRING,
          field: "firstName",
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          field: "lastName",
          allowNull: false,
        },
        birthDate: {
          type: Sequelize.DATE,
          field: "birthDate",
          allowNull: false,
        },
        gender: {
          type: Sequelize.ENUM("Male", "Female"),
          field: "gender",
          allowNull: false,
        },
        type: { type: Sequelize.STRING, field: "type", allowNull: false },
        employmentType: {
          type: Sequelize.STRING,
          field: "employmentType",
          allowNull: false,
        },
        profilePhoto: {
          type: Sequelize.STRING,
          field: "profilePhoto",
          allowNull: true,
        },
        phone: { type: Sequelize.STRING, field: "phone", allowNull: false },
        userId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Users", key: "id" },
          field: "userId",
          allowNull: false,
        },
        departmentId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Departments", key: "id" },
          field: "departmentId",
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Departments",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        departmentCode: {
          type: Sequelize.STRING,
          field: "departmentCode",
          allowNull: false,
        },
        name: { type: Sequelize.STRING, field: "name", allowNull: false },
        headId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          field: "headId",
          onDelete: "CASCADE",
          references: { model: "Instructors", key: "id" },
          allowNull: false,
        },
        facultyId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          field: "facultyId",
          onDelete: "CASCADE",
          references: { model: "Faculties", key: "id" },
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Students",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        studentCode: {
          type: Sequelize.STRING,
          field: "studentCode",
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          field: "firstName",
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          field: "lastName",
          allowNull: false,
        },
        birthDate: {
          type: Sequelize.DATE,
          field: "birthDate",
          allowNull: false,
        },
        gender: { type: Sequelize.STRING, field: "gender", allowNull: false },
        profilePhoto: {
          type: Sequelize.STRING,
          field: "profilePhoto",
          allowNull: true,
        },
        phone: { type: Sequelize.STRING, field: "phone", allowNull: true },
        gainedHours: {
          type: Sequelize.FLOAT,
          field: "gainedHours",
          allowNull: false,
        },
        GPA: { type: Sequelize.FLOAT, field: "GPA", allowNull: false },
        userId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          field: "userId",
          onDelete: "CASCADE",
          references: { model: "Users", key: "id" },
          allowNull: false,
        },
        departmentID: {
          type: Sequelize.UUID,
          field: "departmentID",
          onDelete: "CASCADE",
          references: { model: "Departments", key: "id" },
          allowNull: false,
        },
        BylawId: { type: Sequelize.UUID, field: "BylawId", allowNull: false },
        departmentId: {
          type: Sequelize.UUID,
          field: "departmentId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Departments", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Bylaws",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        code: { type: Sequelize.STRING(10), field: "code", allowNull: false },
        year: { type: Sequelize.INTEGER, field: "year", allowNull: false },
        credit_Hours: {
          type: Sequelize.INTEGER,
          field: "credit_Hours",
          allowNull: false,
        },
        min_GPA: { type: Sequelize.FLOAT, field: "min_GPA", allowNull: false },
        min_Hours: {
          type: Sequelize.INTEGER,
          field: "min_Hours",
          allowNull: false,
        },
        departmentId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "departmentId",
          references: { model: "Departments", key: "id" },
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "BylawRules",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        min_GPA: { type: Sequelize.FLOAT, field: "min_GPA", allowNull: false },
        hoursAllowed: {
          type: Sequelize.INTEGER,
          field: "hoursAllowed",
          allowNull: false,
        },
        bylawId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "bylawId",
          references: { model: "Bylaws", key: "id" },
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Grades",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          unique: true,
          primaryKey: true,
        },
        letter: {
          type: Sequelize.ENUM(
            "A+",
            "A",
            "A-",
            "B+",
            "B",
            "B-",
            "C+",
            "C",
            "C-",
            "D+",
            "D",
            "D-",
            "F"
          ),
          field: "letter",
          allowNull: false,
        },
        point: { type: Sequelize.FLOAT, field: "point", allowNull: false },
        bylawId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "bylawId",
          references: { model: "Bylaws", key: "id" },
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "CourseEnrollments",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        CourseId: {
          type: Sequelize.UUID,
          field: "CourseId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Courses", key: "id" },
          primaryKey: true,
        },
        StudentId: {
          type: Sequelize.UUID,
          field: "StudentId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Students", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "CourseBylaws",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        CourseId: {
          type: Sequelize.UUID,
          field: "CourseId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Courses", key: "id" },
          primaryKey: true,
        },
        BylawId: {
          type: Sequelize.UUID,
          field: "BylawId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Bylaws", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Results",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        studentId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "studentId",
          references: { model: "Students", key: "id" },
          allowNull: false,
        },
        courseId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "courseId",
          references: { model: "Courses", key: "id" },
          allowNull: false,
        },
        semsterId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "semsterId",
          references: { model: "Semsters", key: "id" },
          allowNull: false,
        },
        gradeId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          field: "gradeId",
          references: { model: "Grades", key: "id" },
          allowNull: true,
        },
        finalGrade: {
          type: Sequelize.FLOAT,
          field: "finalGrade",
          allowNull: true,
        },
        midtermGrade: {
          type: Sequelize.FLOAT,
          field: "midtermGrade",
          allowNull: true,
        },
        courseWork: {
          type: Sequelize.FLOAT,
          field: "courseWork",
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Rooms",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        code: {
          type: Sequelize.STRING,
          field: "code",
          unique: true,
          allowNull: false,
        },
        type: {
          type: Sequelize.ENUM("section", "lab", "hall"),
          field: "type",
          allowNull: false,
        },
        capacity: {
          type: Sequelize.INTEGER,
          field: "capacity",
          allowNull: false,
        },
        facultyId: {
          type: Sequelize.UUID,
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "facultyId",
          references: { model: "Faculties", key: "id" },
          allowNull: false,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "Schedules",
      {
        id: {
          type: Sequelize.UUID,
          field: "id",
          allowNull: false,
          unique: true,
          primaryKey: true,
        },
        type: {
          type: Sequelize.ENUM("lab", "lecture"),
          field: "type",
          allowNull: false,
        },
        groupID: {
          type: Sequelize.UUID,
          field: "groupID",
          onDelete: "CASCADE",
          references: { model: "Sections", key: "id" },
          allowNull: false,
        },
        sectionID: {
          type: Sequelize.UUID,
          field: "sectionID",
          onDelete: "CASCADE",
          references: { model: "Sections", key: "id" },
          allowNull: false,
        },
        slotID: { type: Sequelize.UUID, field: "slotID", allowNull: false },
        roomID: { type: Sequelize.UUID, field: "roomID", allowNull: false },
        courseID: { type: Sequelize.UUID, field: "courseID", allowNull: false },
        instructorID: {
          type: Sequelize.UUID,
          field: "instructorID",
          onDelete: "CASCADE",
          references: { model: "Instructors", key: "id" },
          allowNull: false,
        },
        semesterID: {
          type: Sequelize.UUID,
          field: "semesterID",
          allowNull: false,
        },
        SlotId: {
          type: Sequelize.UUID,
          field: "SlotId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Slots", key: "id" },
          allowNull: true,
        },
        RoomId: {
          type: Sequelize.UUID,
          field: "RoomId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Rooms", key: "id" },
          allowNull: true,
        },
        InstructorId: {
          type: Sequelize.UUID,
          field: "InstructorId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Instructors", key: "id" },
          allowNull: true,
        },
        SemsterId: {
          type: Sequelize.UUID,
          field: "SemsterId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Semsters", key: "id" },
          allowNull: true,
        },
        SectionId: {
          type: Sequelize.UUID,
          field: "SectionId",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
          references: { model: "Sections", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "StudentAdvisor",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        StudentId: {
          type: Sequelize.UUID,
          field: "StudentId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Students", key: "id" },
          primaryKey: true,
        },
        InstructorId: {
          type: Sequelize.UUID,
          field: "InstructorId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Instructors", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "StudentSchedule",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        ScheduleId: {
          type: Sequelize.UUID,
          field: "ScheduleId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Schedules", key: "id" },
          primaryKey: true,
        },
        StudentId: {
          type: Sequelize.UUID,
          field: "StudentId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Students", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "CoursePrerequisites",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        CourseId: {
          type: Sequelize.UUID,
          field: "CourseId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Courses", key: "id" },
          primaryKey: true,
        },
        PrerequisiteId: {
          type: Sequelize.UUID,
          field: "PrerequisiteId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Courses", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "DepartmentCourses",
      {
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        CourseId: {
          type: Sequelize.UUID,
          field: "CourseId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Courses", key: "id" },
          primaryKey: true,
        },
        DepartmentId: {
          type: Sequelize.UUID,
          field: "DepartmentId",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          references: { model: "Departments", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["Users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Students", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Courses", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Bylaws", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["BylawRules", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Departments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Instructors", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Schedules", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Universities", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Sections", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Slots", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Grades", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["CourseEnrollments", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["CourseBylaws", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Results", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Semsters", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Rooms", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["Faculties", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["StudentAdvisor", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["StudentSchedule", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["CoursePrerequisites", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["DepartmentCourses", { transaction }],
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
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
