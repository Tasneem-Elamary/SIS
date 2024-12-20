import student from './student.model';
import instructor from './instructor.model';
import schedule from './schedule.model';
import department from './department.model';
import university from './university.model';
import faculty from './faculty.model';
import section from './section.model';
import group from './group.model';
import course from './course.model';
import bylaw from './bylaw.model';
import grade from './grade.model';
import bylawRule from './bylawRule.model';
import courseEnrollment from './courseEnrollment.model';
import bylawCourse from './BylawCourse.model';

import result from './result.model';
import semester from './semester.model';
import room from './room.model';
import slot from './slot.model';
import { db } from '../../config/postgresDB.config';
import user from './user.model';
import studentSchedule from './studentSchedule.model';
import coursePrerequisites from './coursePrerequisites.model';
import departmentCourse from './departmentCourse.model';
import audit from './audit.model';
import bylawDepartment from './bylawDepartment.mode';

const User = user(db);
const Student = student(db);
const Instructor = instructor(db);
const Schedule = schedule(db);
const University = university(db);
const Faculty = faculty(db);
const Department = department(db);
const StudentSchedule = studentSchedule(db);
const Section = section(db);
const Group = group(db);
const Slot = slot(db);
const Course = course(db);
const Bylaw = bylaw(db);
const BylawRule = bylawRule(db);
const Grade = grade(db);
const CourseEnrollment = courseEnrollment(db);
const BylawCourse = bylawCourse(db);
const Result = result(db);
const Semester = semester(db);
const Room = room(db);
const CoursePrerequisite = coursePrerequisites(db);
const DepartmentCourse = departmentCourse(db);
// const MappedCourses = mappedCourses(db);
const Audit = audit(db);
const BylawDepartment = bylawDepartment(db);

Faculty.hasMany(Room, { foreignKey: 'FacultyId' });
Room.belongsTo(Faculty, { foreignKey: 'FacultyId' });

// Bylaw.hasMany(Department, { foreignKey: 'BylawId' });
// Department.belongsTo(Bylaw, { foreignKey: 'BylawId' });

Bylaw.hasMany(Grade, { foreignKey: 'BylawId' });
Grade.belongsTo(Bylaw, { foreignKey: 'BylawId' });

Bylaw.hasMany(Student, { foreignKey: 'BylawId' });
Student.belongsTo(Bylaw, { foreignKey: 'BylawId' });

Bylaw.hasMany(BylawRule, { foreignKey: 'BylawId' });
BylawRule.belongsTo(Bylaw, { foreignKey: 'BylawId' });

// BylawCourse.belongsToMany(BylawCourse, {
//   through: 'MappedCourses',
//   as: 'Course',

//   foreignKey: 'MappedBylawCourseId',
//   otherKey: 'BylawCourseId',
//   constraints: true,
// });

// Course.belongsToMany(Course, {s
//   through: 'CoursePrerequisite',
//   as: 'DependentCourse',
//   foreignKey: 'prerequisiteId',
//   otherKey: 'courseId',
// });

Course.belongsToMany(Bylaw, {
  through: 'BylawCourse', foreignKey: 'CourseId', otherKey: 'BylawId', timestamps: false,
});
Bylaw.belongsToMany(Course, {
  through: 'BylawCourse', foreignKey: 'BylawId', otherKey: 'CourseId', timestamps: false,
});

Course.belongsToMany(Course, {
  through: 'CoursePrerequisites',
  as: 'Prerequisite',
  foreignKey: 'courseId',
  otherKey: 'prerequisiteId',
});

BylawCourse.belongsTo(Course);
Course.belongsTo(BylawCourse);
BylawCourse.belongsTo(Bylaw);
Bylaw.belongsTo(BylawCourse);
BylawCourse.hasMany(BylawCourse, {

  as: 'MappedCourses',
  foreignKey: 'SourceCourseId',
  constraints: true,
});

BylawCourse.belongsTo(BylawCourse, {

  as: 'SourceCourse',
  foreignKey: 'SourceCourseId',

  constraints: true,
});
Course.belongsToMany(Department, {
  through: 'DepartmentCourses',
  foreignKey: 'CourseId',
  otherKey: 'DepartmentId',
});
// Define associations with unique aliases
Course.hasMany(DepartmentCourse, { foreignKey: 'CourseId', as: 'CourseDepartmentCourses' });
Department.hasMany(DepartmentCourse, { foreignKey: 'DepartmentId', as: 'DepartmentDepartmentCourses' });
Bylaw.hasMany(DepartmentCourse, { foreignKey: 'BylawId', as: 'BylawDepartmentCourses' });

// Define reverse associations with unique aliases
DepartmentCourse.belongsTo(Course, { foreignKey: 'CourseId', as: 'RelatedCourse' });
DepartmentCourse.belongsTo(Department, { foreignKey: 'DepartmentId', as: 'RelatedDepartment' });
DepartmentCourse.belongsTo(Bylaw, { foreignKey: 'BylawId', as: 'RelatedBylaw' });

Department.belongsToMany(Course, {
  through: 'DepartmentCourses',
  foreignKey: 'DepartmentId',
  otherKey: 'CourseId',

});
// Course.belongsToMany(Department, {
//   through: 'DepartmentCourses',
//   foreignKey: 'CourseId',
//   otherKey: 'DepartmentId',
//   timestamps: false,

// });

// Department.belongsToMany(Course, {
//   through: 'DepartmentCourses',
//   foreignKey: 'DepartmentId',
//   otherKey: 'CourseId',
//   timestamps: false,
// });
Department.belongsToMany(Bylaw, {
  through: 'BylawDepartments',
  foreignKey: 'DepartmentId',
  otherKey: 'BylawId',

});

Bylaw.belongsToMany(Department, {
  through: 'BylawDepartments',
  foreignKey: 'BylawId',
  otherKey: 'DepartmentId',

});

// Student.hasMany(CourseEnrollment, { foreignKey: 'studentId' });
// CourseEnrollment.belongsTo(Student, { foreignKey: 'studentId' });

// Course.hasMany(CourseEnrollment, { foreignKey: 'CourseId' });
// CourseEnrollment.belongsTo(Course, { foreignKey: 'CourseId' });

Student.hasMany(Result, { foreignKey: 'StudentId' });
Result.belongsTo(Student, { foreignKey: 'StudentId' });

Course.hasMany(Result, { foreignKey: 'CourseId' });
Result.belongsTo(Course, { foreignKey: 'CourseId' });

Grade.hasMany(Result, { foreignKey: 'GradeId' });
Result.belongsTo(Grade, { foreignKey: 'GradeId' });

Semester.hasMany(Result, { foreignKey: 'SemesterId' });
Result.belongsTo(Semester, { foreignKey: 'SemesterId' });

User.hasOne(Student, { foreignKey: 'UserId' });
Student.belongsTo(User, { foreignKey: 'UserId' });

Instructor.hasOne(Department, { foreignKey: 'HeadId' });
Department.belongsTo(Instructor, { foreignKey: 'HeadId' });

User.hasOne(Instructor, { foreignKey: 'UserId' });
Instructor.belongsTo(User, { foreignKey: 'UserId' });

University.hasMany(Faculty, { foreignKey: 'UniversityId' });
Faculty.belongsTo(University, { foreignKey: 'UniversityId' });

Faculty.hasMany(Bylaw, { foreignKey: 'FacultyId' });
Bylaw.belongsTo(Faculty, { foreignKey: 'FacultyId' });

Faculty.hasMany(Department, { foreignKey: 'FacultyId' });
Department.belongsTo(Faculty, { foreignKey: 'FacultyId' });

Department.hasMany(Student, { foreignKey: 'DepartmentId' });
Student.belongsTo(Department, { foreignKey: 'DepartmentId' });

Bylaw.hasMany(Student, { foreignKey: 'BylawId' });
Student.belongsTo(Bylaw, { foreignKey: 'BylawId' });

Department.hasMany(Instructor, { foreignKey: 'DepartmentId' });
Instructor.belongsTo(Department, { foreignKey: 'DepartmentId' });

Student.belongsToMany(Instructor, { through: 'StudentAdvisors', foreignKey: 'StudentId' });
Instructor.belongsToMany(Student, { through: 'StudentAdvisors', foreignKey: 'InstructorId' });
Slot.hasMany(Schedule, { foreignKey: 'SlotId' });
Schedule.belongsTo(Slot, { foreignKey: 'SlotId' });

Room.hasMany(Schedule, { foreignKey: 'RoomId' });
Schedule.belongsTo(Room, { foreignKey: 'RoomId' });

Instructor.hasMany(Schedule, { foreignKey: 'InstructorId1', as: 'SchedulesAsInstructor1' });
Schedule.belongsTo(Instructor, { foreignKey: 'InstructorId1', as: 'Instructor1' });

Instructor.hasMany(Schedule, { foreignKey: 'InstructorId2', as: 'SchedulesAsInstructor2' });
Schedule.belongsTo(Instructor, { foreignKey: 'InstructorId2', as: 'Instructor2' });

Semester.hasMany(Schedule, { foreignKey: 'SemesterId' });
Schedule.belongsTo(Semester, { foreignKey: 'SemesterId' });

Group.hasOne(Schedule, { foreignKey: 'GroupId' });
Schedule.belongsTo(Group, { foreignKey: 'GroupId' });

Section.hasOne(Schedule, { foreignKey: 'SectionId' });
Schedule.belongsTo(Section, { foreignKey: 'SectionId' });

Course.hasMany(Schedule, { foreignKey: 'CourseId' });
Schedule.belongsTo(Course, { foreignKey: 'CourseId' });

Student.belongsToMany(Course, { through: CourseEnrollment, foreignKey: 'StudentId' });
Course.belongsToMany(Student, { through: CourseEnrollment, foreignKey: 'CourseId' });

Schedule.belongsToMany(Student, {
  through: StudentSchedule,
  foreignKey: 'ScheduleId',
  otherKey: 'StudentId',
});

Student.belongsToMany(Schedule, {
  through: StudentSchedule,
  foreignKey: 'StudentId',
  otherKey: 'ScheduleId',
});

StudentSchedule.belongsTo(Schedule, { foreignKey: 'ScheduleId' });
StudentSchedule.belongsTo(Student, { foreignKey: 'StudentId' });

// StudentSchedule model
// StudentSchedule.belongsTo(Schedule, { foreignKey: 'ScheduleId' });
// StudentSchedule.belongsTo(Student, { foreignKey: 'StudentId' });

// db.drop().then(() => {
//   console.log('All tables dropped successfully!');
// })
// db.sync().then(() => {
//   console.log('tables created successfully');
// });
// db.drop().then(() => {
//   console.log('All tables dropped successfully!');
// });
// db.sync({alter:true}).then(() => {
//   console.log('tables created successfully');
// });
export {
  User,
  Course,
  Bylaw,
  Student,
  Instructor,
  Schedule,
  Department,
  Faculty,
  University,
  Section,
  Semester,
  Grade,
  Group,
  Slot, Room, BylawRule, CourseEnrollment, StudentSchedule, BylawCourse,
  Result,
  CoursePrerequisite,
  DepartmentCourse, Audit, BylawDepartment,
};

const models = {
  User,
  Course,
  Bylaw,
  Student,
  Instructor,
  Schedule,
  Department,
  Faculty,
  University,
  Section,
  Semester,
  Grade,
  Group,
  Slot,
  Room,
  BylawRule,
  CourseEnrollment,
  StudentSchedule,
  BylawCourse,
  Result,
  CoursePrerequisite,
  DepartmentCourse,
  Audit,
  BylawDepartment,
};
export const sequelize = db;

// // This export is specifically for sequelize-mig compatibility
export default models;
