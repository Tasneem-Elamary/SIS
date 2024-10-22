import models from '../../models';
import { BylawDepartmentCourseRepo } from '../Repositories';
import { BylawDepartmentCourseType } from '../../types';

class BylawDepartmentCourseData implements BylawDepartmentCourseRepo {
  create = async (DepartmentId: string, CourseId: string): Promise<void | undefined> => {
    try {
      const course = await models.Course.findByPk(CourseId);
      const department:any = await models.Department.findByPk(DepartmentId);

      if (course && department) {
        console.log(Object.getPrototypeOf(department).addCourse);
        await department.addCourse(course);
      } else {
        throw new Error('Course, Department, or Bylaw not found');
      }

      // const departmentCoureBylaw = await models.DepartmentCourse.create({ BylawId, DepartmentId, CourseId });
      // return departmentCoureBylaw?.get();
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to create the association.');
    }
  };
}

export default BylawDepartmentCourseData;
