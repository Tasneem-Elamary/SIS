import { MappedCoursesRepo, BylawRepo } from '../persistance/Repositories';
import { MappedCourseType, BylawCourseType } from '../types';
import { IMappedCourse } from './interfaces';

class MappedCourseService implements IMappedCourse {
  constructor(private mappedCourseData: MappedCoursesRepo, private BylawData: BylawRepo) {}

  public async create(BylawCourseId: string, MappedBylawCourseId: string): Promise<MappedCourseType | undefined> {
    try {
      const newMappedCourse = await this.mappedCourseData.create(BylawCourseId, MappedBylawCourseId);
      return newMappedCourse;
    } catch (error) {
      console.error(error);
      console.log('Failed to create the mapped course , please try again!', error);
      throw new Error('Failed to create the mapped course , please try again!');
    }
  }

  public async getMappedCoursesByCourseId(courseId: string): Promise<(MappedCourseType & { mappedCourse: BylawCourseType }) | undefined> {
    try {
      const mappedCourses = await this.mappedCourseData.getMappedCoursesByCourseId(courseId);
      return mappedCourses;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get mapped courses, please try again!');
    }
  }

  public async getCourseMappedToCourseId(mappedCourseId: string): Promise<BylawCourseType | undefined> {
    try {
      const bylawCourse = await this.mappedCourseData.getCourseMappedToCourseId(mappedCourseId);
      return bylawCourse;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get courses mapped to this course, please try again!');
    }
  }

  public async getBylawMappedCourses(bylawId: string): Promise<(BylawCourseType & { MappedCourses: BylawCourseType[] }) []| undefined> {
    try {
      const bylawMappedCourses = await this.mappedCourseData.getBylawMappedCourses(bylawId);
      return bylawMappedCourses;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get bylaw mapped courses, please try again!');
    }
  }

  public async delete(courseId: string, mappedCourseId: string): Promise<boolean> {
    try {
      const result = await this.mappedCourseData.delete(courseId, mappedCourseId);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the mapped course, please try again!');
    }
  }
}

export default MappedCourseService;
