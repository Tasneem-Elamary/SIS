import user from './user.model';
import student from './student.model';
import instructor from './instructor.model';
import schedule from './schedule.model';
import department from './department.model';
import university from './university.model';
import faculty from './faculty.model';
import section from './section.model';
import group from './group.model';
import { db } from '../../../config/postgresDB.config';
import slot from './slot.model';

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
db.sync({ force: false })
  .then(() => {
    console.log('Tables Created');
  });
/** Associations */
User.hasOne(Student, {
  foreignKey: 'userId',
// as: 'Student',
});
Student.belongsTo(User, {
  foreignKey: 'userId',
// as: 'User',
});

User.hasOne(Instructor, {
  foreignKey: 'userId',
// as: 'Instructor',
});
Instructor.belongsTo(User, {
  foreignKey: 'userId',
// as: 'User',
});

University.hasMany(Faculty, { foreignKey: 'universityId' });
Faculty.belongsTo(University, { foreignKey: 'universityId' });

Faculty.hasMany(Department, { foreignKey: 'facultyId' });
Department.belongsTo(Faculty, { foreignKey: 'facultyId' });

Department.hasMany(Student, { foreignKey: 'departmentId' });
Student.belongsTo(Department, { foreignKey: 'departmentId' });

Department.hasMany(Instructor, { foreignKey: 'departmentId' });
Instructor.belongsTo(Department, { foreignKey: 'departmentId' });

Student.belongsToMany(Instructor, { through: 'StudentAdvisor' });
Instructor.belongsToMany(Student, { through: 'StudentAdvisor' });
// schedule
Slot.hasMany(Schedule);
Schedule.belongsTo(Slot);
/**
Room.hasMany(Schedule);
Schedule.belongsTo(Room);
 */
Instructor.hasMany(Schedule);
Schedule.belongsTo(Instructor);
/**
Semester.hasMany(Schedule);
Schedule.belongsTo(Semester);
 */
Group.hasOne(Schedule);
Schedule.belongsTo(Group);

Section.hasOne(Schedule);
Schedule.belongsTo(Section);

Schedule.belongsToMany(Student, { through: 'StudentSchedule' });
Student.belongsToMany(Schedule, { through: 'StudentSchedule' });

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
};
