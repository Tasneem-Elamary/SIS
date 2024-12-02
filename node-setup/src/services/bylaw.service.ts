import { hash } from 'bcrypt';
import {
  BylawRuleType, BylawType, GradeType, BylawCourseType,
  CourseType,
  BylawDepartmentType,
} from '../types';
import { BylawRepo, GradesRepo } from '../persistance/Repositories'; // Assuming you have a BylawCourseRepo
import IBylaw from './interfaces/IBylaw';
import { hashPassword } from '../util/hashing';

class BylawService implements IBylaw {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private BylawData: BylawRepo,
    private grade:GradesRepo,
  //  private BylawCourseData: BylawCourseRepo // Add BylawCourseRepo for managing BylawCourse
  ) {}

  // Method to create a new bylaw
  public create = async (bylaw: BylawType): Promise<BylawType | undefined> => {
    try {
      const newBylaw = await this.BylawData.create(bylaw);
      return newBylaw;
    } catch (error) {
      throw new Error('Failed to create the bylaw, Please try again!');
    }
  };

  // Method to find a bylaw by its code
  public getByCode = async (code: string): Promise<BylawType | undefined> => {
    try {
      const bylaw = await this.BylawData.getByCode(code);
      return bylaw;
    } catch (error) {
      throw new Error('Failed to find the bylaw by code, Please try again!');
    }
  };

  // Method to find a bylaw by its ID
  public getById = async (id: string): Promise<BylawType | undefined> => {
    try {
      const bylaw = await this.BylawData.getById(id);
      return bylaw;
    } catch (error) {
      console.log('Failed to find the bylaw due to', error);
      throw new Error('Failed to find the bylaw by ID, Please try again!');
    }
  };

  public getBylawLimits = async (id: string): Promise<(Partial<BylawRuleType> & Partial<GradeType>) | undefined> => {
    try {
      const bylaw = await this.BylawData.getBylawDetails(id);
      return bylaw;
    } catch (error) {
      throw new Error('Failed to find Bylaw limits by Bylaw ID, Please try again!');
    }
  };

  public getAll = async (): Promise<BylawType[]> => {
    try {
      console.log(hashPassword('PASS'));
      const bylaws = await this.BylawData.getAll();
      if (bylaws) return bylaws;
      throw new Error("Couldn't retrieve bylaws");
    } catch (error) {
      throw new Error('Failed to retrieve bylaws, Please try again!');
    }
  };

  // Method to update an existing bylaw
  public update = async (id: string, updateData: Partial<BylawType>): Promise<BylawType | undefined> => {
    try {
      const updatedBylaw = await this.BylawData.update(id, updateData);
      return updatedBylaw;
    } catch (error) {
      throw new Error('Failed to update the bylaw, Please try again!');
    }
  };

  // Method to delete an existing bylaw
  public delete = async (id: string): Promise<boolean> => {
    try {
      const success = await this.BylawData.delete(id);
      return success;
    } catch (error) {
      throw new Error('Failed to delete the bylaw, Please try again!');
    }
  };

  // Method to add a course to a bylaw
  public addCourseToBylaw = async (bylawId: string, courseId: string, isElective: boolean): Promise<BylawCourseType | undefined> => {
    try {
      const bylawCourse = await this.BylawData.addCourseToBylaw(bylawId, courseId, isElective);
      return bylawCourse;
    } catch (error) {
      throw new Error('Failed to add course to bylaw, Please try again!');
    }
  };

  public addDepartmentToBylaw = async (bylawId: string, departmentId: string): Promise<BylawDepartmentType | undefined> => {
    try {
      const bylawCourse = await this.BylawData.addDepartmentToBylaw(bylawId, departmentId);
      return bylawCourse;
    } catch (error) {
      throw new Error('Failed to add course to bylaw, Please try again!');
    }
  };

  // Method to get all bylaw courses
  public getAllBylawCourses = async (): Promise<BylawCourseType[] | undefined> => {
    try {
      const bylawCourses = await this.BylawData.getAllBylawCourses();
      return bylawCourses;
    } catch (error) {
      throw new Error('Failed to retrieve bylaw courses, Please try again!');
    }
  };

  public getCoursesNotInBylaw = async (bylawId:string): Promise<CourseType[] | undefined> => {
    try {
      const courses = await this.BylawData.getCoursesNotInBylaw(bylawId);
      return courses;
    } catch (error) {
      throw new Error('Failed to retrieve bylaw courses, Please try again!');
    }
  };

  public getBylawDepartments = async (bylawId:string): Promise<Partial<BylawType & { Courses: Partial<CourseType>[]; }> | undefined> => {
    try {
      const bylawDepartments = await this.BylawData.getBylawDepartments(bylawId);
      return bylawDepartments;
    } catch (error) {
      throw new Error('Failed to retrieve bylaw departments, Please try again!');
    }
  };

  // Method to get all bylaw courses
  public getBylawCourses = async (bylawId:string): Promise<Partial<BylawType & { Courses: Partial<CourseType>[]; }> | undefined> => {
    try {
      const bylawCourses = await this.BylawData.getBylawCourses(bylawId);
      return bylawCourses;
    } catch (error) {
      throw new Error('Failed to retrieve bylaw courses, Please try again!');
    }
  };

  // Method to remove a course from a bylaw
  public removeCourseFromBylaw = async (bylawId: string, courseId: string): Promise<boolean> => {
    try {
      const success = await this.BylawData.removeCourseFromBylaw(bylawId, courseId);
      return success;
    } catch (error) {
      throw new Error('Failed to remove course from bylaw, Please try again!');
    }
  };

  public createBylawGrades = async (BylawId: string, grades: Partial<GradeType>[]): Promise<GradeType[] | undefined> => {
    try {
      const createdGrades = [];

      for (const grade of grades) {
        const { letter, point } = grade;
        if (letter === undefined || point === undefined) {
          throw new Error('Missing required Grade input: GPA point or letter');
        }
        const gradeToCreate: GradeType = { letter, point, BylawId };
        const createdGrade = await this.grade.create(gradeToCreate);
        if (createdGrade) { createdGrades.push(createdGrade); }
      }
      return createdGrades;
    } catch (error) {
      console.log('Failed to create new bylaw rule due to error', error);
      throw new Error('Failed to create new bylaw rule');
    }
  };
}

export default BylawService;
