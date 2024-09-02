import {
  UserType, StudentType, InstructorType, CourseType, DepartmentType,
} from '../../types';

interface facultyAdminRepo {

  createInstructor(user:UserType, instructor:Partial<InstructorType>): Promise<InstructorType| undefined>;
  getInstructorById(id: string): Promise<(InstructorType & { User: UserType }) | undefined>;
  getInstructorByEmail(email: string): Promise<InstructorType | undefined>;
  getAllInstructors(): Promise<(InstructorType & { User: UserType })[] | undefined[]>
  getAllTAs(): Promise<(InstructorType & { User: UserType })[] | undefined[]>
  getAllDoctors(): Promise<(InstructorType & { User: UserType })[] | undefined[]>
  updateInstructor(id: string, updatedData: Partial<InstructorType>): Promise<InstructorType | undefined>;
  deleteInstructor(id: string): Promise<boolean>;

  createCourse(course: CourseType): Promise<CourseType | undefined>;
  updateCourse(id: string, updatedData: Partial<CourseType>): Promise<CourseType | undefined>;
  deleteCourse(id: string): Promise<boolean>;

createDepartment(department: DepartmentType): Promise<DepartmentType | undefined>;
getDepartmentById(id: string): Promise<(DepartmentType) | undefined>;
getDepartmentByCode(code: string): Promise<DepartmentType | undefined>;
getAllDepartments(): Promise<(DepartmentType)[] | undefined[]>;
updateDepartment(id: string, updatedData: Partial<DepartmentType>): Promise<DepartmentType | undefined>;
deleteDepartment(id: string): Promise<boolean>;

  // createSchedule(schedule:scheduleType ): Promise<void>;
  // createBylaw(bylaw:bylawType ): Promise<void>;
  // createStudent(student:StudentType): Promise<void>;
  // deleteStudent(id: string) : Promise<void>;

  // deleteCourse(id: string) : Promise<void>;
  // deleteSchedule(id: string) : Promise<void>;
  // deleteBylaw(id: string) : Promise<void>;

  }
export default facultyAdminRepo;
