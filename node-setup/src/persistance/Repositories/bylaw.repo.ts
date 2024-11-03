import {
  BylawRuleType, BylawType, GradeType, BylawCourseType, CourseType,
  DepartmentType,
  BylawDepartmentType,
} from '../../types';

interface BylawRepo {
  // Bylaw CRUD operations
  create(bylaw: BylawType): Promise<BylawType | undefined>;
  getByCode(code: string): Promise<BylawType | undefined>;
  getById(id: string): Promise<BylawType | undefined>;
  getBylawDetails(id: string): Promise<(Partial<BylawRuleType> & Partial<GradeType>) | undefined>;
  getAll(): Promise<BylawType[] | undefined>;
  update(id: string, updateData: Partial<BylawType>): Promise<BylawType | undefined>;
  delete(id: string): Promise<boolean>;

  // BylawCourse operations
  addCourseToBylaw(bylawId: string, courseId: string, isElective: boolean): Promise<BylawCourseType | undefined>;
  getAllBylawCourses(): Promise<BylawCourseType[] | undefined>;
  removeCourseFromBylaw(bylawId: string, courseId: string): Promise<boolean>;
  getBylawCourses(id: string): Promise<Partial<BylawType & { Courses: Partial<CourseType>[] }> | undefined>;
  addDepartmentToBylaw (bylawId: string, departmentId: string): Promise<BylawDepartmentType | undefined>
  getBylawDepartments (id: string): Promise<Partial<BylawType & { Departments: Partial<DepartmentType>[] }> | undefined>
}

export default BylawRepo;
