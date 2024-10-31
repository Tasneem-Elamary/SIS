import { CourseType, StudentType, UserType } from '../../types';

interface StudentRepo {
    create(studnet: StudentType): Promise<StudentType | undefined>,
    getById(id: string): Promise<StudentType | undefined>,
    getByUserId(id: string): Promise<StudentType | undefined>,
    getStudentByCode (studentCode: string): Promise<StudentType | undefined>,
    getAll(): Promise<(StudentType&UserType)[]>,
    update(studentId:string, data:Partial<StudentType>): Promise<StudentType|undefined>;
    delete(id: string): Promise<boolean>,
    unregisterSchedule (studentId: string, scheduleId: string): Promise<void>
    registerSchedule (studentId: string, scheduleId: string): Promise<void>
    getFailedUnenrolledStudents (courseId: string):Promise<StudentType[]>
    getEnrolledCoursesByStudent (studentId: string): Promise<StudentType>
    ApproveRegularRequest (studentId: string, scheduleCell: number) : Promise<StudentType|undefined>
    ApproveSelfstudyOROverloadRequest (studentId: string, courseCode: string, courseType:string): Promise<StudentType|undefined>
    RejectSelfstudyRequestOROverload (studentId: string, courseCode: string, courseType:string): Promise<StudentType|undefined>
    RejectRegularRequest (studentId: string, scheduleCell: number) : Promise<StudentType|undefined>
    getTopStudentsByGPA (prefix: string, limit: number, level?: number): Promise<StudentType[] | undefined>
    getStudentRank (studentCode: string): Promise<number | undefined>
    registerSchedule (StudentId: string, ScheduleId: string): Promise<void>
    registerSchedules (StudentId: string, scheduleIds: string[]): Promise<void>
    // getStudentsForSpecificBylaw(BylawId: string):Promise<StudentType&string>
    getStudentsForSpecificBylaw(BylawId: string):Promise<StudentType[]>
    // getStudentsForSpecificBylaw(BylawId: string):Promise<(StudentType&string)[]>
    // getByEmail(email: string): Promise<StudentType | undefined>,
}
export default StudentRepo;
