import { PassThrough } from 'stream';

import { IStudent } from './interfaces';
import {
  StudentType, UserType, ResultType, CourseType,
} from '../types';
import { CourseRepo, ResultRepo, StudentRepo } from '../persistance/Repositories';
import UserService from './user.service';

class StudentService implements IStudent {
//   eslint-disable-next-line no-useless-constructor
  constructor(private StudentData: StudentRepo, private ResultData:ResultRepo, private CourseData:CourseRepo) {}

  public createStudents = async (studentsData: (StudentType&UserType)[]): Promise<(StudentType&UserType)[]> => {
    try {
      studentsData.forEach((studentData) => {
        this.create(studentData);
      });
      return studentsData;
    } catch (error) {
      throw new Error('Failed to create multiple students through CSV');
    }
  };

  public create = async (student:StudentType&UserType): Promise<StudentType|undefined> => {
    try {
      const newUser = await this.StudentData.create(student);
      return newUser;
    } catch (error) {
      throw new Error('Failed to create the user, Please try again!');
    }
  };

  public getAllStudents = async (): Promise<(StudentType& { email: string })[]> => {
    try {
      const newUser = await this.StudentData.getAll(); // Call the getAll method in UserDataAccess
      return newUser;
    } catch (error) {
      console.log('service debug:', error);
      throw new Error('Failed to get All Students, Please try again!');
    }
  };

  public updateStudent = async (studentId: string, updateData: Partial<StudentType>): Promise<StudentType|null> => {
    try {
      const updatedStudent = await this.StudentData.update(studentId, updateData);
      if (!updatedStudent) {
        throw new Error('Student not found');
      }
      return updatedStudent;
    } catch (error) {
      throw new Error('Failed to update the student');
    }
  };

  public deleteStudent = async (studentId: string): Promise<boolean> => {
    try {
      const deletionSuccess = await this.StudentData.delete(studentId);
      return deletionSuccess;
    } catch (error) {
      console.error('Error deleting student:', error);
      throw new Error('Failed to delete the student, Please try again!');
    }
  };

  public deleteStudents = async (studentIds: string[]): Promise<number> => {
    try {
      let numOfDeleted = 0;

      for (const studentId of studentIds) {
        console.log('service logging', studentId);

        const deletionSuccess = await this.deleteStudent(studentId);
        if (deletionSuccess) numOfDeleted += 1;
      }

      return numOfDeleted;
    } catch (error) {
      console.error('Error deleting students:', error);
      throw new Error('Failed to delete the students, Please try again!');
    }
  };

  getById = (id: string) => {
    try {
      return this.StudentData.getById(id);
    } catch {
      throw new Error('Fail to get the Student Data, Please try again !!');
    }
  };

  getStudentByCode = async (studentCode: string): Promise<StudentType | undefined> => {
    try {
      const student = await this.StudentData.getStudentByCode(studentCode);
      return student;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw new Error('Fail to get the Student Data by code, Please try again !!');
    }
  };

  public registerSchedule = async (StudentId: string, ScheduleId: string): Promise<void> => {
    try {
      await this.StudentData.registerSchedule(StudentId, ScheduleId);
    } catch (error) {
      throw new Error('Failed to register the schedule, Please try again!');
    }
  };

  public registerSchedules = async (StudentId: string, ScheduleIds: string[]): Promise<void> => {
    try {
      console.log('schedule ids service', ScheduleIds);
      await this.StudentData.registerSchedules(StudentId, ScheduleIds);
    } catch (error) {
      throw new Error('Failed to register the schedule, Please try again!');
    }
  };

  public unregisterSchedule = async (studentId: string, scheduleId: string): Promise<void> => {
    try {
      await this.StudentData.unregisterSchedule(studentId, scheduleId);
    } catch (error) {
      throw new Error('Failed to unregister the schedule, Please try again!');
    }
  };

  public getStudentsForSpecificBylaw = async (BylawId: string): Promise<StudentType[]> => {
    try {
      const students = await this.StudentData.getStudentsForSpecificBylaw(BylawId);
      return students;
    } catch (error) {
      throw new Error('Failed to get Bylaw students, Please try again!');
    }
  };

  public studentFailedOrNotEnrolledCourse = async (courseId:string, level?:number, idPrefix?:string, lastNSemesters?:number):Promise<Partial<StudentType&UserType>[] |undefined> => {
    try {
      let notEnrolledStudents = await this.StudentData.getFailedUnenrolledStudents(courseId);
      if (level) notEnrolledStudents = notEnrolledStudents.filter((student) => student.level === level);
      if (idPrefix) notEnrolledStudents = notEnrolledStudents.filter((student) => student.studentCode.startsWith(idPrefix));
      return notEnrolledStudents;
    } catch (error) {
      throw Error("Couldn't load student who failed or didn't enroll in a course");
    }
  };
  // getByEmail = (email: string) => {
  //   try {
  //     return this.userData.getByEmail(email);
  //   } catch {
  //     throw new Error('Fail to get the user Data, Please try again !!');
  //   }
  // };

  ApproveRegularRequest = async (studentId: string, schedulecell: number): Promise<StudentType|undefined> => {
    try {
      const student = await this.StudentData.ApproveRegularRequest(studentId, schedulecell);
      return student;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };

  ApproveSelfstudyOROverloadRequest = async (studentId: string, courseCode: string, courseType: string): Promise<StudentType|undefined> => {
    try {
      const student = await this.StudentData.ApproveSelfstudyOROverloadRequest(studentId, courseCode, courseType);
      return student;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };

  RejectRegularRequest = async (studentId: string, scheduleCell: number): Promise<StudentType|undefined> => {
    try {
      const student = await this.StudentData.RejectRegularRequest(studentId, scheduleCell);
      return student;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };

  RejectSelfstudyRequestOROverload = async (studentId: string, courseCode: string, courseType: string): Promise<StudentType|undefined> => {
    try {
      const student = await this.StudentData.RejectSelfstudyRequestOROverload(studentId, courseCode, courseType);
      return student;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };

  hasCompletedPrerequisitesAndEarnedHours = async (studentId: string, courseId: string): Promise<boolean> => {
    try {
      // Get enrolled courses and gained hours by the student
      const studentEnrolledCourses: any = await this.StudentData.getEnrolledCoursesByStudent(studentId);
      const { Courses: enrolledCourses, gainedHours } = studentEnrolledCourses;

      // Get prerequisites for the specific course
      const courseWithPrerequisites = await this.CourseData.getCoursePrerequisites(courseId);

      if (!courseWithPrerequisites || !courseWithPrerequisites.Prerequisite.length) {
        return true; // No prerequisites, so return true
      }

      // Check if the student has completed all prerequisites
      const prerequisiteIds = courseWithPrerequisites.Prerequisite.map((prereq) => prereq.id);
      const completedPrerequisites = enrolledCourses.map((course: { id: string }) => course.id);

      const hasCompletedAllPrerequisites = prerequisiteIds.every((prereqId) => completedPrerequisites.includes(prereqId));

      // Check if the student's gainedHours are greater than or equal to the required minEarnedHours
      const meetsEarnedHoursRequirement = gainedHours >= courseWithPrerequisites.minEarnedHours;

      // Return true only if both conditions are satisfied
      return hasCompletedAllPrerequisites && meetsEarnedHoursRequirement;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to check prerequisites, please try again!');
    }
  };

  getTopStudentsByGPA = async (prefix: string, limit: number, level?: number): Promise<StudentType[] | undefined> => {
    try {
      const students = await this.StudentData.getTopStudentsByGPA(prefix, limit);
      return students;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };

  getStudentRank = async (studentCode: string): Promise<number | undefined> => {
    try {
      const rank = await this.StudentData.getStudentRank(studentCode);
      return rank;
    } catch (error) {
      console.error('Error fetching student:', error);
      throw error;
    }
  };
}

export default StudentService;
