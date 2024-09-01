import User from './user.service';
import { IInstuctor } from './interfaces';
import { UserRepo, InstructorRepo, CourseRepo } from '../persistance/Repositories';
import {
  UserType, StudentType, InstructorType, CourseType,
} from '../types';

class Instructor extends User implements IInstuctor {
  constructor(userData:UserRepo, private instructorData:InstructorRepo) {
    super(userData);
  }

  viewProfile = async (id: string): Promise<(InstructorType & { User: UserType }) | undefined> => {
    try {
      const instructor = await this.instructorData.getById(id);

      return instructor;
    } catch {
      throw new Error('Fail to get the instructor');
    }
  };

  editProfile = async (id: string, updatedData: Partial<InstructorType>): Promise<InstructorType | undefined> => {
    try {
      const updatedInstructor = await this.instructorData.update(id, updatedData);

      return updatedInstructor;
    } catch {
      throw new Error('Failed to update the instructor');
    }
  };
}

export default Instructor;
