import { Sequelize } from 'sequelize';
import models, { Bylaw, BylawCourse, Course } from '../../models';
import { CourseRepo } from '../Repositories';
import {
  BylawCourseType, BylawType, CourseType, CoursewithRegistedStudentsType, MappedCourseType,
} from '../../types';

class CourseData implements CourseRepo {
  create = async (course: CourseType): Promise<CourseType | undefined> => {
    try {
      const newCourse = await models.Course.create(course);
      // const newCourse = await models.Course.create(course);
      return newCourse ? (newCourse.get() as CourseType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create the course, please try again!');
    }
  };

  getById = async (id: string): Promise<CourseType | undefined> => {
    try {
      const course = await models.Course.findOne({ where: { id } });
      // const course = await models.Course.findOne({ where: { id } });
      return course ? (course.get() as CourseType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the course, please try again!');
    }
  };

  getByCourseCode = async (courseCode: string): Promise<CourseType | undefined> => {
    try {
      const course = await models.Course.findOne({ where: { code: courseCode } });
      // const course = await models.Course.findOne({ where: { code: courseCode } });
      return course ? (course.get() as CourseType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get the course by code, please try again!');
    }
  };

  getCourseDependants = async (prerequisiteId: string): Promise<(CourseType & { DependentCourse: CourseType[] }) | undefined> => {
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

  getCoursePrerequisites = async (courseId: string): Promise<(CourseType & { Prerequisite: CourseType[] }) | undefined> => {
    try {
      const course = await models.Course.findOne({
        where: { id: courseId },
        include: [
          {
            model: models.Course,
            as: 'Prerequisite',
            through: { attributes: [] },

          },
        ],
      });

      return course ? (course.get() as CourseType & { Prerequisite: CourseType[] }) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get course prerequisites, please try again!');
    }
  };

  getAll = async (): Promise<CourseType[] | undefined[]> => {
    try {
      const courses = await models.Course.findAll({
        include: [
          {
            model: models.Bylaw,
            through: { attributes: [] }, // INNER JOIN on Bylaws through BylawCourses

          },
          {
            model: models.Department,
            through: { attributes: [] }, // LEFT JOIN on Departments through BylawDepartments
            // required: false, // This makes the JOIN a LEFT JOIN instead of an INNER JOIN
          },
        ],
        where: Sequelize.literal(`
        ("Departments"."id", "Bylaws"."id") IN (
          SELECT "BylawDepartments"."DepartmentId", "BylawDepartments"."BylawId"
          FROM "BylawDepartments"
        )
        OR "Departments"."id" IS NULL
        `),
      });
      return courses.map((course) => course.get() as CourseType);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to retrieve courses, please try again!');
    }
  };

  update = async (id: string, updates: Partial<CourseType>): Promise<CourseType | undefined> => {
    try {
      const course = await models.Course.findOne({ where: { id } });
      // const course = await models.Course.findOne({ where: { id } });
      if (course) {
        await course.update(updates);
        return course.get() as CourseType;
      }
      return undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update the course, please try again!');
    }
  };

  delete = async (id: string): Promise<boolean> => {
    try {
      const result = await models.Course.destroy({ where: { id } });
      // const result = await models.Course.destroy({ where: { id } });
      return result > 0;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to delete the course, please try again!');
    }
  };

  addCoursetoDepartment = async (DepartmentId: string, CourseId: string): Promise<void | undefined> => {
    try {
      const course = await models.Course.findByPk(CourseId);
      const department: any = await models.Department.findByPk(DepartmentId);

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

  getCoursesBylevel = async (level: number): Promise<CourseType[] | undefined[]> => {
    try {
      let courses;

      if (level === 1 || level === 2) {
        // For level 1 and 2, courses are only associated with Bylaws, no departments.
        courses = await models.Course.findAll({
          where: { level },
          include: [
            {
              model: models.Bylaw,
              through: { attributes: [] }, // Omitting through table attributes

            },
          ],
        });
      } else if (level === 3 || level === 4) {
        // For level 3 and 4, courses are associated with both Bylaws and Departments.
        courses = await models.Course.findAll({
          where: { level },
          include: [
            {
              model: models.Department,
              through: { attributes: [] },

            },
            {
              model: models.Bylaw,
              through: { attributes: [] },

            },
          ],
        });
      } else {
        throw new Error('Invalid course level');
      }

      return courses.map((course) => course.get());
    } catch (error) {
      // Type guard to ensure the error has a message property
      if (error instanceof Error) {
        // Only catch and re-throw general errors, not specific ones
        if (error.message === 'Invalid course level') {
          throw error; // Re-throw the specific error for invalid levels
        }
        console.error('Error retrieving courses:', error);
        throw new Error('Failed to retrieve courses, please try again!');
      }
      // If it's not an Error instance, throw a generic error
      throw new Error('An unknown error occurred');
    }
  };

  getCourseWithRegisteredStudentCounts = async (courseId: string, bylawId: string): Promise<CoursewithRegistedStudentsType | undefined> => {
    try {
      // Find course details and students' approval statuses
      const course = await models.Course.findOne({
        where: { id: courseId }, // Filter by specific course
        include: [
          {
            model: models.Bylaw,
            where: { id: bylawId },
            through: { attributes: [] },
          },

        ],
      });

      if (!course) {
        throw new Error('Course not found');
      }

      // Count students with approvalStatus: 'Approved' and enrollmentType: 'regular'
      const approvedRegularCount = await models.Course.count({
        where: { id: courseId }, // Filter by specific course
        include: [
          {
            model: models.Bylaw,
            where: { id: bylawId }, // Filter by specific bylaw
          },
          {
            model: models.Student,
            through: {
              attributes: [], // Exclude CourseEnrollments attributes from result
              where: {
                approvalStatus: 'Approved', // Filter by approvalStatus: Approved
                enrollmentType: 'regular', // Filter by enrollmentType: regular
              },
            },
            required: true,
          },
        ],
      });

      // Count students with approvalStatus: 'pending' and enrollmentType: 'regular'
      const pendingRegularCount = await models.Course.count({
        where: { id: courseId }, // Filter by specific course
        include: [
          {
            model: models.Bylaw,
            where: { id: bylawId }, // Filter by specific bylaw
          },
          {
            model: models.Student,
            through: {
              attributes: [], // Exclude CourseEnrollments attributes from result
              where: {
                approvalStatus: 'pending', // Filter by approvalStatus: pending
                enrollmentType: 'regular', // Filter by enrollmentType: regular
              },
            },
            required: true,
          },
        ],
      });

      return {
        ...course.get(), // Get the course details
        approvedRegularCount,
        pendingRegularCount,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Managing Mapped Courses
  addBylawMappedCourse = async (BylawCourseId: string, MappedBylawCourseId: string): Promise<Partial<BylawCourseType&{Course:Partial<CourseType>}&{Bylaw:Partial<BylawType>}> | undefined> => {
    try {
      const sourceCourse = await BylawCourse.findByPk(BylawCourseId);
      const mappedCourse = await BylawCourse.findByPk(BylawCourseId);
      if (!sourceCourse) {
        throw Error('Failed to find bylaw course ');
      }
      if (!mappedCourse) {
        throw Error('Failed to find mapped bylaw course ');
      }
      const newMappedCourse = await models.BylawCourse.update(
        { SourceCourseId: BylawCourseId },
        { where: { id: MappedBylawCourseId } },
      );
      return sourceCourse ? (sourceCourse.get() as MappedCourseType) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to create the mapped course entry, please try again!');
    }
  };

  getMappedCoursesForBylawCourseId = async (BylawCourseId: string): Promise<Partial<BylawCourseType&{Course:Partial<CourseType>}&{Bylaw:Partial<BylawType>}>[] | undefined> => {
    try {
      const mappedCourses = await models.BylawCourse.findAll({
        where: { SourceCourseId: BylawCourseId },

        include: [{ model: Course, attributes: ['id', 'code', 'name'] },
          { model: Bylaw, attributes: ['id', 'code'] }],

        attributes: [],
      });
      return mappedCourses.map((mappedCourse) => mappedCourse as MappedCourseType);
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get mapped courses, please try again!');
    }
  };

  getCourseMappedToCourseId = async (CourseId: string): Promise<Partial<BylawCourseType&{Course:Partial<CourseType>}&{Bylaw:Partial<BylawType>}> | undefined> => {
    try {
      const mappedCourse = await models.BylawCourse.findOne({ where: { id: CourseId } });
      const bylawCourse = await models.BylawCourse.findOne({
        where: { id: mappedCourse?.getDataValue('SourceCourseId') },

        include: [{ model: Course, attributes: ['id', 'code', 'name'] },
          { model: Bylaw, attributes: ['id', 'code'] }],

      });
      return bylawCourse ? (bylawCourse.get() as BylawCourseType & { MappedCourses: BylawCourseType }) : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get courses mapped to this course, please try again!');
    }
  };

  getBylawMappedCourses = async (bylawId: string): Promise<Partial<BylawCourseType&{Course:Partial<CourseType>}&{Bylaw:Partial<BylawType>}>[] | undefined> => {
    try {
      const bylawMappedCourses = await models.BylawCourse.findAll({
        where: { BylawId: bylawId }, // Find courses for a specific bylaw
        include: [
          {
            model: models.Course, // Include primary course details
            attributes: ['id', 'code','name'], // Select relevant course attributes
          },
          {
            model: models.Bylaw, // Include bylaw details
            attributes: ['id', 'code'], // Select relevant bylaw attributes
          },
          {
            model: models.BylawCourse, // Self-referenced mapped courses
            as: 'MappedCourses', // Alias to indicate self-reference
           required:true,
            include: [
              {
                model: models.Course, // Include details of mapped courses
                attributes: ['id', 'code','name'],
              },
            ],
          },
        ],
      });
      
      return bylawMappedCourses
        ? bylawMappedCourses.map((bylawMappedCourse) => bylawMappedCourse.get() as BylawCourseType & { MappedCourses: BylawCourseType[] })
        : undefined;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get courses mapped to this bylaw, please try again!');
    }
  };
}

export default CourseData;
