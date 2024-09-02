import User from './user.service';
import { IfacultyAdmin } from './interfaces';
import {
  UserRepo, InstructorRepo, CourseRepo, DepartmentRepo,
} from '../persistance/Repositories';
import {
  UserType, StudentType, InstructorType, CourseType, DepartmentType,
} from '../types';

class FacultyAdmin extends User implements IfacultyAdmin {
  constructor(userData:UserRepo, private instructorData:InstructorRepo, private courseData: CourseRepo, private departmentData: DepartmentRepo) {
    super(userData);
  }

  createInstructor = async (user:UserType, instructor:Partial<InstructorType>): Promise<InstructorType| undefined> => {
    try {
      const newUser = await this.userData.create(user);
      const userId = newUser?.id;

      if (!userId) {
        throw new Error('Failed to create user .');
      }

      // Construct the full InstructorType object
      const fullInstructor: InstructorType = {
        ...instructor,
        UserId: userId,
      } as InstructorType;

      return this.instructorData.create(fullInstructor);
    } catch {
      throw new Error('Fail to create instructor');
    }
  };

  getInstructorById = async (id: string): Promise<(InstructorType & { User: UserType }) | undefined> => {
    try {
      const instructor = await this.instructorData.getById(id);

      return instructor;
    } catch {
      throw new Error('Fail to get the instructor');
    }
  };

  getInstructorByEmail = async (email: string): Promise<InstructorType | undefined> => {
    try {
      const user = await this.userData.getByEmail(email);

      if (!user) {
        throw new Error('Failed to get the instructor by email');
      }

      const userId = user.id as string;
      console.log(userId);

      const instructor = await this.instructorData.getByUserId(userId);
      console.log(instructor);
      return instructor || undefined;
    } catch {
      throw new Error('Failed to get the instructor by email');
    }
  };

  // Method to get all instructors
  getAllInstructors = async (): Promise<(InstructorType & { User: UserType })[] | undefined[]> => {
    try {
      const instructors = await this.instructorData.getAll();
      return instructors;
    } catch {
      throw new Error('Failed to get all instructors');
    }
  };

  getAllTAs = async (): Promise<(InstructorType & { User: UserType })[] | undefined[]> => {
    try {
      const instructors = await this.instructorData.getAll();

      // Filter instructors with type 'TA' only
      const filteredInstructors = (instructors ?? []).filter(
        (instructor): instructor is InstructorType & { User: UserType } => instructor !== undefined && instructor.type === 'TA',
      );

      return filteredInstructors;
    } catch {
      throw new Error('Failed to get all instructors');
    }
  };

  getAllDoctors = async (): Promise<(InstructorType & { User: UserType })[] | undefined[]> => {
    try {
      const instructors = await this.instructorData.getAll();

      // Filter instructors with type 'TA' only
      const filteredInstructors = (instructors ?? []).filter(
        (instructor): instructor is InstructorType & { User: UserType } => instructor !== undefined && instructor.type === 'Professor',
      );

      return filteredInstructors;
    } catch {
      throw new Error('Failed to get all instructors');
    }
  };

  // Method to update an instructor
  updateInstructor = async (id: string, updatedData: Partial<InstructorType>): Promise<InstructorType | undefined> => {
    try {
      const updatedInstructor = await this.instructorData.update(id, updatedData);

      return updatedInstructor;
    } catch {
      throw new Error('Failed to update the instructor');
    }
  };

  // Method to delete an instructor
  deleteInstructor = async (id: string): Promise<boolean> => {
    try {
      const instructor = await this.instructorData.getById(id);

      if (!instructor) {
        throw new Error('Instructor not found');
      }

      const userId = instructor.UserId;

      const instructorDeleted = await this.instructorData.delete(id);

      if (!instructorDeleted) {
        throw new Error('Failed to delete the instructor');
      }

      const userDeleted = await this.userData.delete(userId);

      if (!userDeleted) {
        throw new Error('Failed to delete the associated user');
      }

      return true;
    } catch (error) {
      throw new Error('Failed to delete the instructor');
    }
  };

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

  createDepartment = async (department: DepartmentType): Promise<DepartmentType | undefined> => {
    try {
      const newDepartment = await this.departmentData.create(department);
      if (!newDepartment) {
        throw new Error('Failed to create department.');
      }

      return newDepartment;
    } catch {
      throw new Error('Failed to create department.');
    }
  };

  // Method to get a department by ID
  getDepartmentById = async (id: string): Promise<DepartmentType | undefined> => {
    try {
      const department = await this.departmentData.getById(id);

      return department;
    } catch {
      throw new Error('Failed to get the department.');
    }
  };

  // Method to get a department by code
  getDepartmentByCode = async (code: string): Promise<DepartmentType | undefined> => {
    try {
      const department = await this.departmentData.getBydepartmentCode(code);

      return department;
    } catch {
      throw new Error('Failed to get the department by code.');
    }
  };

  // Method to get all departments
  getAllDepartments = async (): Promise<DepartmentType[] | undefined[]> => {
    try {
      const departments = await this.departmentData.getAll();

      return departments;
    } catch {
      throw new Error('Failed to get all departments.');
    }
  };

  // Method to update a department
  updateDepartment = async (id: string, updatedData: Partial<DepartmentType>): Promise<DepartmentType | undefined> => {
    try {
      const updatedDepartment = await this.departmentData.update(id, updatedData);

      return updatedDepartment;
    } catch {
      throw new Error('Failed to update the department.');
    }
  };

  // Method to delete a department
  deleteDepartment = async (id: string): Promise<boolean> => {
    try {
      const departmentDeleted = await this.departmentData.delete(id);

      if (!departmentDeleted) {
        throw new Error('Failed to delete the department.');
      }

      return true;
    } catch {
      throw new Error('Failed to delete the department.');
    }
  };

  // createStudent = async (student: StudentType): Promise<void> => {
  //   // implementation here
  // };
  // createCourse = async (course: CourseType): Promise<void> => {
  //   // implementation here
  // };

  // createSchedule = async (schedule: ScheduleType): Promise<void> => {
  //   // implementation here
  // };

  // createBylaw = async (bylaw: BylawType): Promise<void> => {
  //   // implementation here
  // };

  // deleteStudent = async (id: string): Promise<void> => {
  //   // implementation here
  // };

  // deleteInstructor = async (id: string): Promise<void> => {
  //   // implementation here
  // };

  // deleteCourse = async (id: string): Promise<void> => {
  //   // implementation here
  // };

  // deleteSchedule = async (id: string): Promise<void> => {
  //   // implementation here
  // };

  // deleteBylaw = async (id: string): Promise<void> => {
  //   // implementation here
  // };
}

export default FacultyAdmin;
