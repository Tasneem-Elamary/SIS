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
import { db } from '../../config/postgresDB.config';

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

Faculty.hasMany(Room, { foreignKey: 'FacultyId' });
Room.belongsTo(Faculty, { foreignKey: 'FacultyId' });

Department.hasMany(Bylaw, { foreignKey: 'DepartmentId' });
Bylaw.belongsTo(Department, { foreignKey: 'DepartmentId' });

Bylaw.hasMany(Grade, { foreignKey: 'BylawId' });
Grade.belongsTo(Bylaw, { foreignKey: 'BylawId' });

Bylaw.hasMany(BylawRule, { foreignKey: 'BylawId' });
BylawRule.belongsTo(Bylaw, { foreignKey: 'BylawId' });

Course.belongsToMany(Course, {
  through: 'CoursePrerequisites',
  as: 'Prerequisites',
  foreignKey: 'courseId',
  otherKey: 'prerequisiteId',
});
Course.belongsToMany(Bylaw, { through: 'BylawCourses' });
Bylaw.belongsToMany(Course, { through: 'BylawCourses' });

Course.belongsToMany(Department, { through: 'DepartmentCourses' });
Department.belongsToMany(Course, { through: 'DepartmentCourses' });

Course.belongsToMany(Student, { through: 'CourseEnrollments' });
Student.belongsToMany(Course, { through: 'CourseEnrollments' });

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

Faculty.hasMany(Department, { foreignKey: 'FacultyId' });
Department.belongsTo(Faculty, { foreignKey: 'FacultyId' });

Department.hasMany(Student, { foreignKey: 'DepartmentId' });
Student.belongsTo(Department, { foreignKey: 'DepartmentId' });

Department.hasMany(Instructor, { foreignKey: 'DepartmentId' });
Instructor.belongsTo(Department, { foreignKey: 'DepartmentId' });

Student.belongsToMany(Instructor, { through: 'StudentAdvisors' });
Instructor.belongsToMany(Student, { through: 'StudentAdvisors' });

Slot.hasMany(Schedule, { foreignKey: 'SlotId' });
Schedule.belongsTo(Slot, { foreignKey: 'SlotId' });

Room.hasMany(Schedule, { foreignKey: 'RoomId' });
Schedule.belongsTo(Room, { foreignKey: 'RoomId' });

Instructor.hasMany(Schedule, { foreignKey: 'InstructorId' });
Schedule.belongsTo(Instructor, { foreignKey: 'InstructorId' });

Semester.hasMany(Schedule, { foreignKey: 'SemesterId' });
Schedule.belongsTo(Semester, { foreignKey: 'SemesterId' });

Group.hasOne(Schedule, { foreignKey: 'GroupId' });
Schedule.belongsTo(Group, { foreignKey: 'GroupId' });

Section.hasOne(Schedule, { foreignKey: 'SectionId' });
Schedule.belongsTo(Section, { foreignKey: 'SectionId' });

Schedule.belongsToMany(Student, { through: 'StudentSchedules' });
Student.belongsToMany(Schedule, { through: 'StudentSchedules' });

// db.drop().then(() => {
//   console.log('All tables dropped successfully!');
// })
// db.sync({force:true}).then(()=>{
//   console.log("tables created successfully")
// }
// )
export const models = {
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
  Group,
  Slot,

};

export const sequelize = db;

// This export is specifically for sequelize-mig compatibility
export default models;
