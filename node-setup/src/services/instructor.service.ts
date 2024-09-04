import { QueryTypes } from 'sequelize';
import User from './user.service';
import { IInstuctor } from './interfaces';
import { UserRepo, InstructorRepo, CourseRepo ,ResultRepo } from '../persistance/Repositories';
import {
  UserType, StudentType, InstructorType, CourseType, StudentAdvisorType,ResultType
} from '../types';
import { sequelize } from '../models';

class Instructor extends User implements IInstuctor {
  constructor(userData:UserRepo, private instructorData:InstructorRepo ,private resultData:ResultRepo) {
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

  getStudentsByAdvisor = async (instructorId: string): Promise<StudentType[]> => {
    try {
      const results = await sequelize.query<StudentType>(

        'SELECT * FROM "Students" WHERE "id" IN (SELECT "StudentId" FROM "StudentAdvisors" WHERE "InstructorId" = :instructorId)',
        {
          type: QueryTypes.SELECT, // Use QueryTypes directly
          replacements: { instructorId }, // Safely pass the instructorId
        },
      );

      console.log('Students for Advisor:', results);
      return results;
    } catch (error) {
      console.error('Error fetching records for advisor:', error);
      throw new Error('Failed to get students for the specified advisor');
    }
  };

   uploadResults=async(results: Partial<ResultType>[]): Promise<ResultType[] | undefined[]> =>{
    try {
      const createdResults = await this.resultData.bulkCreateResults(results);
      return createdResults.length > 0 ? createdResults : [];
    } catch (error) {
      console.error('Error creating results from CSV:', error);
      return [];
    }
  }

  // Update a result
   updateResultbyId=async(id: string, updatedData: Partial<ResultType>): Promise<ResultType | undefined> =>{
    try {
      const updatedResult = await this.resultData.updateResultById(id, updatedData);
      return updatedResult;
    } catch (error) {
      console.error(`Error updating result with ID ${id}:`, error);
      return undefined;
    }
  }
}

export default Instructor;
