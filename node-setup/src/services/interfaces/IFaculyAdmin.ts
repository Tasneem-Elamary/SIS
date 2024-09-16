import {
  UserType, StudentType, InstructorType, CourseType, DepartmentType, StudentAdvisorType, GradeType,
  SemesterType,
} from '../../types';

interface facultyAdminRepo {

  createFacultyAdmin(FacultyAdmin: UserType): Promise<Partial<UserType> | undefined>;

  }
export default facultyAdminRepo;
