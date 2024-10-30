import models from '../../models';
import { BylawDepartmentCourseRepo } from '../Repositories';
import { BylawDepartmentCourseType } from '../../types';

class BylawDepartmentCourseData implements BylawDepartmentCourseRepo {
  create = async (DepartmentId: string | null, CourseId: string, BylawId:string): Promise<BylawDepartmentCourseType | undefined> => {
    try {
      const departmentCoureBylaw = await models.DepartmentCourse.create({ BylawId, DepartmentId: DepartmentId || null, CourseId });
      return departmentCoureBylaw?.get();
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to create the association.');
    }
  };

  getAll = async ():Promise<BylawDepartmentCourseType[] | undefined[]> => {
    try {
      const departmentCourses = await models.DepartmentCourse.findAll({
        include: [
          {
            model: models.Course,
            attributes: ['code', 'name'], // Add relevant course fields
          },
          {
            model: models.Department,
            attributes: ['code', 'name'], // Add relevant department fields
          },
          {
            model: models.Bylaw,
            attributes: ['code'], // Add relevant bylaw fields
          },
        ],
      });
      return departmentCourses.map((departmentCourse) => departmentCourse.get() as BylawDepartmentCourseType);
    } catch (error) {
      console.error('Error fetching department courses:', error);
      throw error;
    }
  };

  getAllByCourseLevel = async (courseLevel: number): Promise<BylawDepartmentCourseType[] | undefined[]> => {
    try {
      console.log(courseLevel);
      const departmentCourses = await models.DepartmentCourse.findAll({
        include: [
          {
            model: models.Course,
            attributes: ['id', 'code', 'name', 'level'], // Include the level field if it's part of the Course model
            where: { level: courseLevel }, // Filter by course level
          },
          {
            model: models.Department,
            attributes: ['id', 'code', 'name'],
          },
          {
            model: models.Bylaw,
            attributes: ['id', 'code'],
          },
        ],
      });
      return departmentCourses.map((departmentCourse) => {
        const data = departmentCourse.get();
        return {
          CourseId: data.CourseId,
          DepartmentId: data.DepartmentId,
          BylawId: data.BylawId,
          CourseCode: data.Course ? data.Course.code : null,
          DepartmentCode: data.Department ? data.Department.code : null,
          BylawCode: data.Bylaw ? data.Bylaw.code : null,
        } as BylawDepartmentCourseType;
      });
    } catch (error) {
      console.error('Error fetching department courses:', error);
      throw error;
    }
  };

  delete = async (DepartmentId: string | null, CourseId: string, BylawId: string): Promise<boolean> => {
    try {
      const deleteResult = await models.DepartmentCourse.destroy({
        where: {
          DepartmentId: DepartmentId || null,
          CourseId,
          BylawId,
        },
      });

      // If deleteResult is greater than 0, it means rows were deleted
      return deleteResult > 0;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to delete the association.');
    }
  };
}
export default BylawDepartmentCourseData;
