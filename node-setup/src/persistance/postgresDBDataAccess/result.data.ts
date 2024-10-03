import { Op } from 'sequelize';
import models from '../../models'; // Assuming Result is your Sequelize model
import { ResultRepo } from '../Repositories';
import { ResultType } from '../../types'; // Assuming ResultType is defined in your types

class ResultData implements ResultRepo {
  // Bulk create results from CSV or similar
  bulkCreateResults = async (results: Partial<ResultType>[]): Promise<ResultType[] | undefined[]> => {
    try {
      const createdResults = await models.Result.bulkCreate(results as any);

      return createdResults.length > 0 ? createdResults.map((result) => result.get() as ResultType) : [];
    } catch (error) {
      console.error('Error bulk creating results:', error);
      return [];
    }
  };

  create = async (results: Partial<ResultType>): Promise<ResultType| undefined> => {
    try {
      const createdResult = await models.Result.create(results as any);

      return createdResult ? createdResult.get() as ResultType : undefined;
    } catch (error) {
      throw new Error('Error  creating result');
    }
  };

  // Get all results
  getAll = async (): Promise<ResultType[] | undefined[]> => {
    try {
      const results = await models.Result.findAll({
        include: [
          {
            model: models.Student, // Join with Student
            attributes: ['studentCode'],
          },
          {
            model: models.Course, // Join with Course
            attributes: ['code'],
          },
          {
            model: models.Semester, // Join with Semester
            attributes: ['season', 'year'],
          },
          {
            model: models.Grade, // Join with Grade (might be null)
            attributes: ['letter'],
          },
        ],
      });

      // Flattening the associations to return only the first object where applicable
      return results.length > 0
        ? results.map((result) => {
          const plainResult :any = result.get({ plain: true }) as ResultType;

          return {
            ...plainResult,
            Student: plainResult.Student ? plainResult.Student.studentCode : plainResult.Student,
            Course: plainResult.Course ? plainResult.Course.code : plainResult.Course,
            Semester: plainResult.Semester ? `${plainResult.Semester.season} ${plainResult.Semester.year}` : plainResult.Semester,
            Grade: plainResult.Grade ? plainResult.Grade.letter : plainResult.Grade, // Could be null
          };
        })
        : [];
    } catch (error) {
      console.error('Error fetching all results:', error);
      return [];
    }
  };

  // Get results by student ID
  getByStudentId = async (studentId: string): Promise<ResultType[] | undefined[]> => {
    try {
      const results = await models.Result.findAll({
        where: {
          StudentId: studentId, // Assuming 'studentId' is a field in the Result model
        },
        include: [
          {
            model: models.Student, // Join with Student
            attributes: ['studentCode'],
          },
          {
            model: models.Course, // Join with Course
            attributes: ['code'],
          },
          {
            model: models.Semester, // Join with Semester
            attributes: ['season', 'year'],
          },
          {
            model: models.Grade, // Join with Grade (might be null)
            attributes: ['letter'],
          },
        ],
      });

      // Flattening the associations to return only the first object where applicable
      return results.length > 0
        ? results.map((result) => {
          const plainResult :any = result.get({ plain: true }) as ResultType;

          return {
            ...plainResult,
            Student: plainResult.Student ? plainResult.Student.studentCode : plainResult.Student,
            Course: plainResult.Course ? plainResult.Course.code : plainResult.Course,
            Semester: plainResult.Semester ? `${plainResult.Semester.season} ${plainResult.Semester.year}` : plainResult.Semester,
            Grade: plainResult.Grade ? plainResult.Grade.letter : plainResult.Grade, // Could be null
          };
        })
        : [];
    } catch (error) {
      console.error(`Error fetching results for student ID ${studentId}:`, error);
      return [];
    }
  };

  // Get results by course ID
  async getByCourseId(courseId: string): Promise<ResultType[] | undefined[]> {
    try {
      const results = await models.Result.findAll({ where: { CourseId: courseId } });
      return results.length > 0 ? results.map((result) => result.get() as ResultType) : [];
    } catch (error) {
      console.error(`Error fetching results for course ID ${courseId}:`, error);
      return [];
    }
  }

  // Get results by student ID and course ID
  getByStudentIdAndCourseIdAndSemesterId = async (studentId: string, courseId: string, semesterId: string): Promise<ResultType| undefined> => {
    try {
      const result = await models.Result.findOne({
        where: {
          StudentId: studentId,
          CourseId: courseId,
          SemesterId: semesterId,
        },
      });
      return result ? result.get() as ResultType : undefined;
    } catch (error) {
      console.error(`Error fetching results for student ID ${studentId} and course ID ${courseId}:`, error);
      return undefined;
    }
  };

  // Get results by student ID and semester ID
  geByStudentIdAndSemesterId = async (studentId: string, semesterId: string): Promise<ResultType[] | undefined[]> => {
    try {
      const results = await models.Result.findAll({
        where: {
          StudentId: studentId,
          SemesterId: semesterId,
        },
      });
      return results.length > 0 ? results.map((result) => result.get() as ResultType) : [];
    } catch (error) {
      console.error(`Error fetching results for student ID ${studentId} and semester ID ${semesterId}:`, error);
      return [];
    }
  };

  // Update a result by ID
  updateResultById = async (id: string, updates: Partial<ResultType>): Promise<ResultType | undefined> => {
    try {
      const result = await models.Result.findOne({ where: { id } });
      if (result) {
        await result.update(updates);
        await result.reload();

        return result.get() as ResultType;
      }

      return undefined;
    } catch (error) {
      console.error('Error updating result with ID ');
      return undefined;
    }
  };

  // Delete a result by ID
  deleteResultById = async (id: string): Promise<boolean> => {
    try {
      const rowsDeleted = await models.Result.destroy({ where: { id } });
      return rowsDeleted > 0;
    } catch (error) {
      console.error(`Error deleting result with ID ${id}:`, error);
      return false;
    }
  };
}

export default ResultData;
