import { CourseDataAcces } from '../../index'; // Update with the correct path
import models from '../../../../models'; // Update with the correct path

describe('Course Service', () => {
  let courseDataAccess: CourseDataAcces;

  beforeEach(() => {
    courseDataAccess = new CourseDataAcces();
    jest.clearAllMocks(); // Reset mocks before each test
  });

  // Test for addCoursetoDepartment
  describe('addCoursetoDepartment', () => {
    it('should add a course to a department successfully', async () => {
      const mockCourse = { id: 'courseId', get: jest.fn(() => ({ id: 'courseId' })) };
      const mockDepartment = { id: 'departmentId', addCourse: jest.fn() };

      models.Course.findByPk = jest.fn().mockResolvedValue(mockCourse);
      models.Department.findByPk = jest.fn().mockResolvedValue(mockDepartment);

      await courseDataAccess.addCoursetoDepartment('departmentId', 'courseId');

      expect(models.Course.findByPk).toHaveBeenCalledWith('courseId');
      expect(models.Department.findByPk).toHaveBeenCalledWith('departmentId');
      expect(mockDepartment.addCourse).toHaveBeenCalledWith(mockCourse);
    });

    it('should throw an error when course or department is not found', async () => {
      models.Course.findByPk = jest.fn().mockResolvedValue(null);
      models.Department.findByPk = jest.fn().mockResolvedValue(null);

      await expect(courseDataAccess.addCoursetoDepartment('departmentId', 'courseId'))
        .rejects
        .toThrow('Failed to create the association.');

      expect(models.Course.findByPk).toHaveBeenCalledWith('courseId');
      expect(models.Department.findByPk).toHaveBeenCalledWith('departmentId');
    });
  });

//   Test for getCoursesBylevel
  describe('getCoursesBylevel', () => {
    it('should return courses for level 1 and 2 (Bylaw only)', async () => {
      const mockCourses = [
       {get: jest.fn(() => ( { id: 'course1', level: 1, Bylaw: {} }))} ,
       {get: jest.fn(() => ( { id: 'course2', level: 1, Bylaw: {} }))} ,
      ];

      const mockResultCourses = [
        { id: 'course1', level: 1, Bylaw: {} },
        { id: 'course2', level: 1,  Bylaw: {} },
      ];

      models.Course.findAll = jest.fn().mockResolvedValue(mockCourses);

      const result = await courseDataAccess.getCoursesBylevel(1);

      expect(models.Course.findAll).toHaveBeenCalledWith({
        where: { level: 1 },
        include: [{ model: models.Bylaw, through: { attributes: [] } }],
      });
      expect(result).toEqual(mockResultCourses);
    });

    it('should return courses for level 3 and 4 (Bylaw and Department)', async () => {
      const mockResultCourses = [
        { id: 'course3', level: 3, Department: {}, Bylaw: {} },
        { id: 'course4', level: 3, Department: {}, Bylaw: {} },
      ];
      const mockCourses = [
        {get: jest.fn(() => (  { id: 'course3', level: 3, Department: {}, Bylaw: {} }))} ,
        {get: jest.fn(() => ( { id: 'course4', level: 3, Department: {}, Bylaw: {} }))} ,
       ];
 
       

      models.Course.findAll = jest.fn().mockResolvedValue(mockCourses);

      const result = await courseDataAccess.getCoursesBylevel(3);

      expect(models.Course.findAll).toHaveBeenCalledWith({
        where: { level: 3 },
        include: [
          { model: models.Department, through: { attributes: [] } },
          { model: models.Bylaw, through: { attributes: [] } },
        ],
      });
      expect(result).toEqual(mockResultCourses);
    });

    it('should throw an error for invalid levels', async () => {
      await expect(courseDataAccess.getCoursesBylevel(5))
        .rejects
        .toThrow('Invalid course level');
    });
  });

//   // Test for getCourseWithRegisteredStudentCounts
  describe('getCourseWithRegisteredStudentCounts', () => {
    it('should return course details with student counts', async () => {
      const mockCourse = {
       
        get: jest.fn(() => ({ id: 'courseId', name: 'Course Name',  Bylaw: {} })),
     
      };

      models.Course.findOne = jest.fn().mockResolvedValue(mockCourse);

      models.Course.count = jest.fn()
        .mockResolvedValueOnce(10) // approvedRegularCount
        .mockResolvedValueOnce(5); // pendingRegularCount

      const result = await courseDataAccess.getCourseWithRegisteredStudentCounts('courseId', 'bylawId');

      expect(models.Course.findOne).toHaveBeenCalledWith({
        where: { id: 'courseId' },
        include: [{ model: models.Bylaw, where: { id: 'bylawId' }, through: { attributes: [] } }],
      });

      expect(models.Course.count).toHaveBeenNthCalledWith(1, {
        where: { id: 'courseId' },
        include: [
          { model: models.Bylaw, where: { id: 'bylawId' } },
          {
            model: models.Student,
            through: {
              attributes: [],
              where: { approvalStatus: 'Approved', enrollmentType: 'regular' },
            },
            required: true,
          },
        ],
      });

      expect(models.Course.count).toHaveBeenNthCalledWith(2, {
        where: { id: 'courseId' },
        include: [
          { model: models.Bylaw, where: { id: 'bylawId' } },
          {
            model: models.Student,
            through: {
              attributes: [],
              where: { approvalStatus: 'pending', enrollmentType: 'regular' },
            },
            required: true,
          },
        ],
      });

      expect(result).toEqual({
        id: 'courseId',
        name: 'Course Name',
        Bylaw: {},
        approvedRegularCount: 10,
        pendingRegularCount: 5,
      });
    });

    it('should throw an error if the course is not found', async () => {
      models.Course.findOne = jest.fn().mockResolvedValue(null);

      await expect(courseDataAccess.getCourseWithRegisteredStudentCounts('invalidId', 'bylawId'))
        .rejects
        .toThrow('Course not found');
    });
  });
});