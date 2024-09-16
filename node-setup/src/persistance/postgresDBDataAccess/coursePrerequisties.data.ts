import models from '../../models';
import { CoursePrerequisitesRepo } from '../Repositories';
import { CoursePrerequisitesType, CourseType } from '../../types';

class CoursePrerequisitesData implements CoursePrerequisitesRepo {
  // Create a new course prerequisite entry
  create = async (courseId: string, prerequisiteId: string): Promise<CoursePrerequisitesType | undefined> => {
    try {
      const newPrerequisite = await models.CoursePrerequisite.create({ courseId, prerequisiteId });

      return newPrerequisite ? (newPrerequisite.get() as CoursePrerequisitesType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create the course prerequisite, please try again!');
    }
  };

  // Get all prerequisites for a course
  getPrerequisitesByCourseId = async (courseId: string): Promise<(CoursePrerequisitesType & { prerequisite: CourseType })[]| undefined[]> => {
    try {
      const prerequisites = await models.Course.findAll({
        where: { id: courseId },
        include: [{ model: models.Course, as: 'Prerequisite', through: { attributes: [] } }], // Assuming 'prerequisite' association exists
      });
      console.log(prerequisites);
      return prerequisites.map((prerequisite) => prerequisite.get() as CoursePrerequisitesType);
    } catch (error) {
      console.error(error);
      return [];
      throw new Error('Failed to get course prerequisites, please try again!');
    }
  };

  // Get all courses dependent on a prerequisite
  getCoursesByPrerequisiteId = async (prerequisiteId: string): Promise<(CourseType & { DependentCourse: CourseType[] })| undefined> => {
    try {
      const course = await models.Course.findOne({
        where: { id: prerequisiteId },
        include: [{ model: models.Course, as: 'DependentCourse', through: { attributes: [] } }], // Assuming 'prerequisite' association exists
      });
      return course ? (course.get() as CourseType & { DependentCourse: CourseType[] }) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get courses dependent on this prerequisite, please try again!');
    }
  };

  // Delete a course prerequisite
  delete = async (courseId: string, prerequisiteId: string): Promise<boolean> => {
    try {
      const result = await models.CoursePrerequisite.destroy({ where: { courseId, prerequisiteId } });
      return result > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the course prerequisite, please try again!');
    }
  };
}

export default CoursePrerequisitesData;
