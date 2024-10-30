import User from './user.service';
import { ICourse } from './interfaces';
import {
  UserRepo, InstructorRepo, CourseRepo, CoursePrerequisitesRepo, BylawDepartmentCourseRepo,
} from '../persistance/Repositories';
import { BylawDataAccess, DepartmentDataAccess } from '../persistance/postgresDBDataAccess';
import {
  UserType, StudentType, InstructorType, CourseType, CoursePrerequisitesType,
  CoursewithRegistedStudentsType,
  BylawDepartmentCourseType,
} from '../types';

class Course implements ICourse {
  constructor(
private courseData: CourseRepo,
    private coursePrerequesitieData: CoursePrerequisitesRepo,
private bylawDepartmentCourseData:BylawDepartmentCourseRepo,
  ) {
  }

  createCourse = async (course: CourseType): Promise<CourseType | undefined> => {
    try {
      return this.courseData.create(course);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create course, please try again!');
    }
  };

  updateCourse = async (id: string, updatedData: Partial<CourseType>): Promise<CourseType | undefined> => {
    try {
      const updatedCourse = await this.courseData.update(id, updatedData);
      return updatedCourse;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update the course, please try again!');
    }
  };

  deleteCourse = async (id: string): Promise<boolean> => {
    try {
      return await this.courseData.delete(id);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the course, please try again!');
    }
  };

  getCourseById = async (id: string): Promise<CourseType | undefined> => {
    try {
      const course = await this.courseData.getById(id);
      if (!course) return undefined;
      return course;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the course, please try again!');
    }
  };

  getCourseByCode = async (courseCode: string): Promise<CourseType | undefined> => {
    try {
      const course = await this.courseData.getByCourseCode(courseCode);
      if (!course) return undefined;
      return course;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the course by code, please try again!');
    }
  };

  getAllCourses = async (): Promise<BylawDepartmentCourseType[]| undefined[]> => {
    try {
      return await this.bylawDepartmentCourseData.getAll();
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get all courses, please try again!');
    }
  };

  addcourseToDepartment = async (departmentId:string | null, courseId: string, BylawId: string): Promise<BylawDepartmentCourseType| undefined> => {
    try {
      const course = await this.courseData.getByCourseCode(courseId);
      const Bylaw = await new BylawDataAccess().getByCode(BylawId);
      const ByawCourses = await new BylawDataAccess().getBylawCourses(Bylaw?.id as string);

      if (!course || !Bylaw) {
        throw new Error('Course or Bylaw not found');
      }

      const courseExistsInBylaw = ByawCourses?.Courses?.some(
        (courseObj) => courseObj.code === courseId,
      );
      if (!courseExistsInBylaw) {
        throw new Error('Bylaw does not include this course');
      }

      let department;
      if (departmentId) {
        department = await new DepartmentDataAccess().getBydepartmentCode(departmentId);
        const ByawDepartments = await new BylawDataAccess().getBylawDepartments(Bylaw?.id as string);

        const departmentExistsInBylaw = ByawDepartments?.Departments?.some(
          (departmentObj) => departmentObj.code === departmentId,
        );
        if (!departmentExistsInBylaw) {
          throw new Error('Bylaw does not include this department');
        }
      }

      const courseDepartment = await this.bylawDepartmentCourseData.create(
        department?.id ?? null,
          course.id as string,
          Bylaw.id as string,
      );
      return courseDepartment;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get all courses, please try again!');
    }
  };

  createCoursePrerequisites = async (courseId: string, prerequisiteId: string): Promise<CoursePrerequisitesType | undefined> => {
    try {
      const prerequisite = await this.coursePrerequesitieData.create(courseId, prerequisiteId);

      return prerequisite || undefined;
    } catch (error) {
      throw new Error('Error fetching prerequisites for course ');
    }
  };

  getCoursePrerequisites = async (courseId: string): Promise<(CourseType & { Prerequisite: CourseType[] }) | undefined> => {
    try {
      const prerequisites = await this.courseData.getCoursePrerequisites(courseId);

      return prerequisites;
    } catch (error) {
      throw new Error('Error fetching prerequisites for course ');
    }
  };

  getCourseDependants = async (prerequisiteId: string): Promise<(CourseType & { DependentCourse: CourseType[] }) | undefined> => {
    try {
      const depentants = await this.courseData.getCourseDependants(prerequisiteId);

      return depentants;
    } catch (error) {
      throw new Error('Error fetching prerequisites for course ');
    }
  };

  getCoursesBylevel = async (level:number): Promise<BylawDepartmentCourseType[] | undefined[]> => {
    try {
      const courses = await this.bylawDepartmentCourseData.getAllByCourseLevel(level);

      return courses;
    } catch (error) {
      throw new Error('Error fetching prerequisites for course ');
    }
  };

  getCourseWithRegisteredStudentCounts = async (courseId: string, bylawId: string): Promise<CoursewithRegistedStudentsType| undefined> => {
    try {
      const course = await this.courseData.getCourseWithRegisteredStudentCounts(courseId, bylawId);

      return course;
    } catch (error) {
      throw new Error('Error fetching prerequisites for course ');
    }
  };

  deleteCourseOfBylawAndDepartment = async (departmentId:string | null, courseId: string, BylawId: string): Promise<boolean> => {
    try {
      const result = await this.bylawDepartmentCourseData.delete(
        departmentId ?? null,
        courseId as string,
        BylawId as string,
      );
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get all courses, please try again!');
    }
  };

  getDistinctProfessorsByCourse = async (courseId: string): Promise<CourseType & { Schedules: InstructorType[] } | undefined> => {
    try {
      const course = await this.courseData.getDistinctProfessorsByCourse(courseId);

      return course || undefined;
    } catch (error) {
      throw new Error('Failed to get professors teaches this course');
    }
  };
}

export default Course;
