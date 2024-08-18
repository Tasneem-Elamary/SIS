import user from './user.model';
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
import courseBylaw from './courseBylaw.model';
import result from './result.model';
import semester from './semester.model';
import room from './room.model';
import slot from './slot.model';
import { db } from '../../../config/postgresDB.config';

const User = user(db);
const Student = student(db);
const Instructor = instructor(db);
const Schedule = schedule(db);
const Department = department(db);
const Faculty = faculty(db);
const University = university(db);
const Section = section(db);
const Group = group(db);
const Slot = slot(db);
const Course = course(db);
const Bylaw = bylaw(db);
const BylawRule = bylawRule(db);
const Grade = grade(db);
const CourseEnrollment = courseEnrollment(db);
const CourseBylaw = courseBylaw(db);
const Result = result(db);
const Semester = semester(db);
const Room = room(db);

Faculty.hasMany(Room, { foreignKey: 'facultyId' });
Room.belongsTo(Faculty, { foreignKey: 'facultyId' });

Department.hasMany(Bylaw, { foreignKey: 'DepartmentId' });
Bylaw.belongsTo(Department, { foreignKey: 'DepartmentId' });

Bylaw.hasMany(Grade, { foreignKey: 'BylawId' });
Grade.belongsTo(Bylaw, { foreignKey: 'BylawId' });

Bylaw.hasMany(BylawRule, { foreignKey: 'BylawId' });
BylawRule.belongsTo(Bylaw, { foreignKey: 'BylawId' });

Course.belongsToMany(Course, {
  through: 'CoursePrerequisite',
  foreignKey: 'CourseId',
  otherKey: 'PrerequisiteId',
  as: 'Prerequisites',
});

Course.belongsToMany(Bylaw, { through: 'CourseBylaws' });
Bylaw.belongsToMany(Course, { through: 'CourseBylaws' });

Course.belongsToMany(Department, { through: 'DepartmentCourses' });
Department.belongsToMany(Course, { through: 'DepartmentCourses' });

Course.belongsToMany(Student, { through: 'CourseEnrollments' });
Student.belongsToMany(Course, { through: 'CourseEnrollments' });

Student.hasMany(Result, { foreignKey: 'StudentId' });
Result.belongsTo(Student, { foreignKey: 'StudentId' });

Course.hasMany(Result, { foreignKey: 'CourseId' });
Result.belongsTo(Course, { foreignKey: 'CourseId' });

Grade.hasMany(Result, { foreignKey: 'GradeID' });
Result.belongsTo(Grade, { foreignKey: 'GradeID' });

Semester.hasMany(Result, { foreignKey: 'SemsterId' });
Result.belongsTo(Semester, { foreignKey: 'SemsterId' });

User.hasOne(Student, {
  foreignKey: 'userId',
});
Student.belongsTo(User, {
  foreignKey: 'userId',
});

User.hasOne(Instructor, {
  foreignKey: 'userId',
});
Instructor.belongsTo(User, {
  foreignKey: 'userId',

});

University.hasMany(Faculty, { foreignKey: 'universityId' });
Faculty.belongsTo(University, { foreignKey: 'universityId' });

Faculty.hasMany(Department, { foreignKey: 'facultyId' });
Department.belongsTo(Faculty, { foreignKey: 'facultyId' });

Department.hasMany(Student, { foreignKey: 'departmentId' });
Student.belongsTo(Department, { foreignKey: 'departmentId' });

Department.hasMany(Instructor, { foreignKey: 'departmentId' });
Instructor.belongsTo(Department, { foreignKey: 'departmentId' });

Student.belongsToMany(Instructor, { through: 'StudentAdvisors' });
Instructor.belongsToMany(Student, { through: 'StudentAdvisors' });

Slot.hasMany(Schedule);
Schedule.belongsTo(Slot);

Room.hasMany(Schedule);
Schedule.belongsTo(Room);

Instructor.hasMany(Schedule);
Schedule.belongsTo(Instructor);

Semester.hasMany(Schedule);
Schedule.belongsTo(Semester);

Group.hasOne(Schedule);
Schedule.belongsTo(Group);

Section.hasOne(Schedule);
Schedule.belongsTo(Section);

Schedule.belongsToMany(Student, { through: 'StudentSchedules' });
Student.belongsToMany(Schedule, { through: 'StudentSchedules' });

db.sync({ force: true })
  .then(() => {
    console.log('Tables Created');
  });
export {
  User,
  Student,
  Instructor,
  Schedule,
  Department,
  Faculty,
  University,
  Section,
  Group,
  Slot,
  Course,
  Bylaw,
};
