import User from './user.service';
import { IfacultyAdmin } from './interfaces';
import { UserRepo } from '../persistance/Repositories';
import { StudentType } from '../types';

class FacultyAdmin extends User implements IfacultyAdmin {
  // constructor(private userData:UserRepo) {
  //   super(userData);
  // }

  // // FacultyAdminRepo methods implementation
  createStudent = async (student: StudentType): Promise<void> => {
    // implementation here
  };

  // createInstructor = async (instructor: InstructorType): Promise<void> => {
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
