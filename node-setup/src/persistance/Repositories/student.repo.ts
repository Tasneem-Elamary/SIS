import { StudentType, UserType } from '../../types';

interface StudentRepo {
    create(studnet: StudentType): Promise<StudentType | undefined>,
    getById(id: string): Promise<StudentType | undefined>,
    getByUserId(id: string): Promise<StudentType | undefined>,
    getAll(): Promise<(StudentType&UserType)[]>,
    update(studentId:string, data:Partial<StudentType>): Promise<StudentType|undefined>;
    delete(id: string): Promise<boolean>,
    unregisterSchedule (studentId: string, scheduleId: string): Promise<void>
    registerSchedule (studentId: string, scheduleId: string): Promise<void>
    // getByEmail(email: string): Promise<StudentType | undefined>,
}
export default StudentRepo;
