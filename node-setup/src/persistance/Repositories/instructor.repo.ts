import { Transaction } from 'sequelize';
import { InstructorType, UserType, StudentType } from '../../types';

interface InstructorRepo {
  create(instructor: InstructorType, transaction?:Transaction): Promise<InstructorType | undefined>;
  getById(id: string): Promise<(InstructorType &UserType) | undefined> ;
getByUserId(UserId: string): Promise<InstructorType | undefined>;
  getAll(): Promise<(InstructorType & UserType)[] | undefined[]>;
  getadvisorStudents(instructorId: string): Promise<(InstructorType & { Student: StudentType[] })| undefined>
  update(id: string, updatedData: Partial<InstructorType>): Promise<InstructorType | undefined>;
  delete(id: string, transaction?:Transaction): Promise<boolean>;
  getListOfPendingStudents (instructorId: string): Promise<InstructorType|undefined>
  getSelfStudyOROverloadPendingStudents (instructorId: string, enrollmentType:string): Promise<InstructorType|undefined>
}

export default InstructorRepo;
