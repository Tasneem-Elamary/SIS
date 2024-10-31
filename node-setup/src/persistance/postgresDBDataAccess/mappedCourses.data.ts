import models from '../../models';
import { MappedCoursesRepo } from '../Repositories';
import { MappedCourseType, BylawCourseType } from '../../types';

class MappedCoursesData implements MappedCoursesRepo {
  create = async (courseId: string, mappedCourseId: string): Promise<MappedCourseType | undefined> => {
    try {
      const newMappedCourse = await models.MappedCourses.create({ courseId, mappedCourseId });
      return newMappedCourse ? (newMappedCourse.get() as MappedCourseType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create the mapped course entry, please try again!');
    }
  };

  getMappedCoursesByCourseId = async (courseId: string): Promise<(MappedCourseType & { mappedCourse: BylawCourseType })[] | undefined[]> => {
    try {
      const mappedCourses = await models.BylawCourse.findAll({
        where: { id: courseId },
        include: [{ model: models.BylawCourse, as: 'MappedCourses', through: { attributes: [] } }],
      });
      return mappedCourses.map((mappedCourse) => mappedCourse.get() as MappedCourseType);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get mapped courses, please try again!');
    }
  };

  getCoursesMappedToCourseId = async (mappedCourseId: string): Promise<(BylawCourseType & { MappedCourses: BylawCourseType[] }) | undefined> => {
    try {
      const bylawCourse = await models.BylawCourse.findOne({
        where: { id: mappedCourseId },
        include: [{ model: models.BylawCourse, as: 'MappedCourses', through: { attributes: [] } }],
      });
      return bylawCourse ? (bylawCourse.get() as BylawCourseType & { MappedCourses: BylawCourseType[] }) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get courses mapped to this course, please try again!');
    }
  };

  delete = async (courseId: string, mappedCourseId: string): Promise<boolean> => {
    try {
      const result = await models.MappedCourses.destroy({ where: { courseId, mappedCourseId } });
      return result > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the mapped course, please try again!');
    }
  };
}

export default MappedCoursesData;
