import UserRepo from './user.repo';
import StudentRepo from './student.repo';
import BylawRepo from './bylaw.repo';
// import * as Postgres from './postgresDBDataAccess';
import InstructorRepo from './instructor.repo';
import CourseRepo from './course.repo';
import DepartmentRepo from './department.repo';
import FacultyRepo from './faculty.repo';
import ScheduleRepo from './schedule.repo';
import CourseEnrollmentRepo from './courseEnrollment.repo';
import BylawRuleRepo from './bylawRule.repo';
import GradesRepo from './grade.repo';
import SemesterRepo from './semster.repo';
import ResultRepo from './result.repo';
import UniversityRepo from './university.repo';
import CoursePrerequisitesRepo from './coursePrerequisite.repo';
import BylawDepartmentCourseRepo from './bylawDepartmentcourse.repo';

export {
  UserRepo,
  StudentRepo,
  BylawRepo, ScheduleRepo,
  InstructorRepo, CourseRepo, DepartmentRepo, FacultyRepo, GradesRepo, CourseEnrollmentRepo, BylawRuleRepo,

  SemesterRepo, ResultRepo, UniversityRepo, CoursePrerequisitesRepo, BylawDepartmentCourseRepo,
};
