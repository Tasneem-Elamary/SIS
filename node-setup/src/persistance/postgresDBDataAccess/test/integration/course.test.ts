import { CourseDataAcces } from '../../index'; // Adjust the path as necessary
import models from '../../../../models'; // Adjust the models path as necessary
import { sequelize } from '../../../../models';
import Env, { connectToDB } from '../../../../../config';

describe('Course Service Integration Tests', () => {
  const courseData = new CourseDataAcces();
  let course1Id: string;
  let course2Id: string;
  let course3Id: string;
  let createdCourseIds: string[] = [];

  // beforeAll( () => {
  //      connectToDB() // Sync the test database schema
  //   });
  beforeEach(async () => {
    const course1 = await models.Course.create({
      code: 'instru56', name: 'Instrument', creditHours: 180, level: 3, min_GPA: 3.2, minEarnedHours: 300,
    });
    const course2 = await models.Course.create({
      code: 'chem00', name: 'chemstry', creditHours: 110, level: 1, min_GPA: 0, minEarnedHours: 0,
    });
    const course3 = await models.Course.create({
      code: 'DA66', name: 'Data Analysis', creditHours: 180, level: 3, min_GPA: 2.2, minEarnedHours: 500,
    });

    course1Id = course1.get().id;
    course2Id = course2.get().id;
    course3Id = course3.get().id;

    console.log('Course1 ID:', course1Id);
    console.log('Course2 ID:', course2Id);
    console.log('Course3 ID:', course3Id);

    createdCourseIds.push(course1Id, course2Id, course3Id);

    // Create prerequisite relationship between courses
    await models.CoursePrerequisite.create({ courseId: course1Id, prerequisiteId: course2.get().id });
    await models.CoursePrerequisite.create({ courseId: course1Id, prerequisiteId: course3.get().id });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  afterEach(async () => {
    // Delete only the records created in beforeEach
    await models.Course.destroy({
      where: { id: createdCourseIds },
    });

    // Clear the array for the next test
    createdCourseIds = [];
  });

  // Integration test for the 'create' method
  describe('create', () => {
    it('should create a new course', async () => {
      const newCourse = {
        code: 'comArch12', name: 'computer architeture', creditHours: 180, level: 2, min_GPA: 2.2, minEarnedHours: 300,
      }; // Define the new course data
      const result = await courseData.create(newCourse);
      expect(result).toEqual(expect.objectContaining({ name: 'computer architeture' }));
      await courseData.delete(result?.id as string);
    });

    it('should throw an error if creation fails', async () => {
      // This will depend on any validations or constraints you've defined
      const invalidCourse = {}; // Empty or invalid data
      await expect(courseData.create(invalidCourse as any)).rejects.toThrow('Failed to create the course, please try again!');
    });
  });

  // Integration test for the 'update' method
  describe('update', () => {
    it('should update an existing course', async () => {
      const updates = { creditHours: 200 }; // Define the updates
      const result = await courseData.update(course1Id, updates);
      expect(result).toEqual(expect.objectContaining({ id: course1Id, creditHours: 200 }));
    });

    it('should return undefined if course does not exist', async () => {
      const updates = { name: 'Non-existent Course' };
      const result = await courseData.update('7a4bdf63-39b6-4b9a-ba34-eaa1a3101333', updates); // Non-existent course ID
      expect(result).toBeUndefined();
    });
  });

  // Integration test for the 'delete' method
  describe('delete', () => {
    it('should delete an existing course', async () => {
      const result = await courseData.delete(course3Id); // Deleting course with id '3'
      expect(result).toBe(true);

      // Ensure that the course is no longer in the database
      const deletedCourse = await courseData.getById(course3Id);
      expect(deletedCourse).toBeUndefined();
    });

    it('should return false if course does not exist', async () => {
      const result = await courseData.delete('7a4bdf63-39b6-4b9a-ba34-eaa1a3101333'); // Non-existent course ID
      expect(result).toBe(false);
    });
  });

  // Integration test for the 'getById' method (already defined)
  describe('getById', () => {
    it('should return the course if found', async () => {
      const result = await courseData.getById(course1Id);
      expect(result).toEqual(expect.objectContaining({ id: course1Id, name: 'Instrument' }));
    });

    it('should return undefined if no course is found', async () => {
      const result = await courseData.getById('7a4bdf63-39b6-4b9a-ba34-eaa1a3101333'); // Invalid/non-existent ID
      expect(result).toBeUndefined();
    });
  });

  // Integration test for the 'getCoursePrerequisites' method (already defined)
  describe('getCoursePrerequisites', () => {
    it('should return the course with prerequisites if found', async () => {
      const result = await courseData.getCoursePrerequisites(course1Id);
      expect(result).toMatchObject({
        id: course1Id,
        name: 'Instrument',
        Prerequisite: [
          {
            id: course2Id, code: 'chem00', name: 'chemstry', creditHours: 110, level: 1, min_GPA: 0, minEarnedHours: 0,
          },
          {
            id: course3Id, code: 'DA66', name: 'Data Analysis', creditHours: 180, level: 3, min_GPA: 2.2, minEarnedHours: 500,
          },
        ],
      });
    });

    it('should return undefined if no course is found', async () => {
      const result = await courseData.getCoursePrerequisites('7a4bdf63-39b6-4b9a-ba34-eaa1a3101333'); // Invalid/non-existent ID
      expect(result).toBeUndefined();
    });

    it('should return empty prerequisite array if course has no prerequisites', async () => {
      const result = await courseData.getCoursePrerequisites(course2Id); // Course 2 has no prerequisites
      expect(result).toMatchObject({
        id: course2Id,
        name: 'chemstry',
        Prerequisite: [], // No prerequisites
      });
    });
  });
});
