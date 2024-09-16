import {
  UserType, StudentType, InstructorType, CourseType, DepartmentType, StudentAdvisorType, GradeType,
  SemesterType,
} from '../../types';

  interface gradeRepo {

  createGrade(grade: GradeType): Promise<GradeType | undefined>;
  getAllGradesBylawId (BylawId: string): Promise<GradeType[] | undefined[]>
  getGradeIdByLetterAndBylawId (gradeLetter: string, BylawId: string): Promise<GradeType | undefined>;
  updateGrade(id: string, updatedData: Partial<GradeType>): Promise<GradeType | undefined>;
  deleteGrade(id: string): Promise<boolean>;

    }
export default gradeRepo;
