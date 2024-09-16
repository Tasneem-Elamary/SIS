import User from './user.service';
import { IResult } from './interfaces';
import {
  CourseRepo, GradesRepo, ResultRepo, SemesterRepo, StudentRepo,
} from '../persistance/Repositories';
import {
  ResultType,
} from '../types';
// import StudentRepo from './interfaces/IStudent';

class Result implements IResult {
  constructor(
private resultData: ResultRepo,
private studentData:StudentRepo,
    private courseData:CourseRepo,
private semsterData:SemesterRepo,
private gradeData:GradesRepo,
  ) {
  }

  async getStudentResult(studentId: string): Promise<ResultType[] | undefined[]> {
    try {
      // Call the data layer method to get results by student ID
      const results = await this.resultData.getByStudentId(studentId);
      return results.length > 0 ? results : [];
    } catch (error) {
      console.error(`Error fetching results for student ID ${studentId}:`, error);
      return [];
    }
  }

  getStudentCourseResult = async (
    studentId: string,
    courseId: string,
    semesterId: string,
  ): Promise<ResultType | undefined> => {
    try {
      const result = await this.resultData.getByStudentIdAndCourseIdAndSemesterId(studentId, courseId, semesterId);
      return result; // Returns the result if found, or undefined
    } catch (error) {
      console.error(`Error fetching results for student ID ${studentId}, course ID ${courseId}, and semester ID ${semesterId}:`, error);
      return undefined;
    }
  };

  getStudentSemesterResult = async (
    studentId: string,
    semesterId: string,
  ): Promise<ResultType[] | undefined[]> => {
    try {
      const results = await this.resultData.geByStudentIdAndSemesterId(studentId, semesterId);
      return results.length > 0 ? results : [];
    } catch (error) {
      console.error(`Error fetching results for student ID ${studentId}, and semester ID ${semesterId}:`, error);
      return [];
    }
  };

  uploadResults = async (results:any): Promise<ResultType[] | undefined[]> => {
    try {
      const transformedData = await Promise.all(
        results.map(async (result:any) => {
          const student = await this.studentData.getStudentByCode(result.studentCode);
          const course = await this.courseData.getByCourseCode(result.courseCode);

          const grade = result.GradeLetter
            ? await this.gradeData.getGradeIdByLetterAndBylawId(result.GradeLetter, student?.BylawId as string)
            : null;

          // Get the current semester
          const currentSemester = await this.semsterData.getCurrentSemester();

          // Return transformed object
          return {
            StudentId: student?.id,
            CourseId: course?.id,
            SemesterId: currentSemester?.id,
            GradeId: grade?.id || null, // Handle the case where GradeId may be null
            finalGrade: result.finalGrade || null,
            midtermGrade: result.midtermGrade || null,
            courseWork: result.courseWork || null,
          };
        }),
      );
      const createdResults = await this.resultData.bulkCreateResults(transformedData);
      return createdResults.length > 0 ? createdResults : [];
    } catch (error) {
      console.error('Error creating results from CSV:', error);
      return [];
    }
  };

  // Update a result
  updateResultbyId = async (id: string, updatedData: Partial<ResultType>): Promise<ResultType | undefined> => {
    try {
      const updatedResult = await this.resultData.updateResultById(id, updatedData);
      return updatedResult;
    } catch (error) {
      console.error(`Error updating result with ID ${id}:`, error);
      return undefined;
    }
  };
}

export default Result;
