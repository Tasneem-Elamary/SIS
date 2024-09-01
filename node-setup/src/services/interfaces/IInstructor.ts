import { InstructorType, UserType,CourseType } from '../../types';

interface instructorRepo {

  viewProfile(id: string): Promise<(InstructorType & { User: UserType }) | undefined>;
  editProfile(id: string, updatedData: Partial<InstructorType>): Promise<InstructorType | undefined>;

//   viewCourses() : Promise<CourseType[] | undefined[]>;
//  assignGrade(resultId:string,grade:number): Promise<boolean | undefined[]>;
}

export default instructorRepo;
