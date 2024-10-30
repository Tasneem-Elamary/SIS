import {
  BylawRuleType, BylawType, GradeType, BylawCourseType,
  CourseType,
  BylawDepartmentType,
} from '../../types';

interface IBylaw {
  create(bylaw: BylawType): Promise<BylawType | undefined>;
  getByCode(code: string): Promise<BylawType | undefined>;
  getById(id: string): Promise<BylawType | undefined>;
  getBylawLimits(id: string): Promise<(Partial<BylawRuleType> & Partial<GradeType>) | undefined>;
  getAll(): Promise<BylawType[]>;
  update(id: string, updateData: Partial<BylawType>): Promise<BylawType | undefined>;
  delete(id: string): Promise<boolean>;

  // Methods bylaw courses
  addCourseToBylaw(bylawId: string, courseId: string, isElective: boolean): Promise<BylawCourseType | undefined>;
  getAllBylawCourses(): Promise<BylawCourseType[] | undefined>;
  removeCourseFromBylaw(bylawId: string, courseId: string): Promise<boolean>;
  getBylawCourses(bylawId: string): Promise<Partial<BylawType & { Courses: Partial<CourseType>[]; }> | undefined>;

  addDepartmentToBylaw (bylawId: string, departmentId: string): Promise<BylawDepartmentType | undefined>

  getBylawDepartments (bylawId:string): Promise<Partial<BylawType & { Courses: Partial<CourseType>[]; }> | undefined>
}

export default IBylaw;
