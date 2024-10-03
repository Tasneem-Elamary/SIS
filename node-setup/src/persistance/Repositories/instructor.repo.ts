import { Transaction } from 'sequelize';
import {
  InstructorType, UserType, StudentType, CourseType,
} from '../../types';

interface InstructorRepo {
  create(instructor: InstructorType, transaction?:Transaction): Promise<InstructorType | undefined>;
  getById(id: string): Promise<(InstructorType &UserType) | undefined> ;
getByUserId(UserId: string): Promise<InstructorType | undefined>;
getByCode(code: string): Promise<InstructorType | undefined>;
  getAll(): Promise<(InstructorType & UserType)[] | undefined[]>;
  getadvisorStudents(instructorId: string): Promise<(InstructorType & { Student: StudentType[] })| undefined>
  update(id: string, updatedData: Partial<InstructorType>): Promise<InstructorType | undefined>;
  delete(id: string, transaction?:Transaction): Promise<boolean>;
  getListOfPendingStudents (instructorId: string): Promise<InstructorType|undefined>
  getSelfStudyOROverloadPendingStudents (instructorId: string, enrollmentType:string): Promise<InstructorType|undefined>
  getDistinctCoursesByProfessor (instructorId: string): Promise<InstructorType&{Schedules:CourseType[]} | undefined>

}

export default InstructorRepo;
