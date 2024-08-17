import user from './user.model';
import { db } from '../../../config/postgresDB.config';
import department from './department.model'; 
import course from './course.model';
import bylaw from './bylaw.model';
import grade from './grade.model';
import bylawRule from './bylawRule.model';
import student from './student.model'
import courseEnrollment from './courseEnrollment.model';
import courseBylaw from './courseBylaw.model';
import result from './result.model';
import semster from './semster.model';
import room from './room.model';
import faculty from "./faculty.model"



const User = user(db);
const Student = student(db);
const Course = course(db);
const Bylaw = bylaw(db);
const BylawRule = bylawRule(db);
const Department = department(db);
const Grade = grade(db);
const CourseEnrollment = courseEnrollment(db);
const CourseBylaw = courseBylaw(db);
const Result = result(db);
const Semster = semster(db);
const Room=room(db);
const Faculty=faculty(db)




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
  otherKey: 'PrerequisiteId'
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

Semster.hasMany(Result, { foreignKey: 'SemsterId' });
Result.belongsTo(Semster, { foreignKey: 'SemsterId' });  




db.sync({ force: false })
  .then(() => {
    console.log('Tables Created');
  });

export {
  User,Course,Bylaw
};
