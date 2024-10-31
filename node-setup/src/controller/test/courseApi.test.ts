import request from 'supertest';
import { NextFunction, Request, Response } from 'express';
import { httpServer } from '../../server'; // Adjust to your Express app path
import models from '../../models'; // Adjust to your models path

// Mock database methods if necessary
jest.mock('../../models'); // Adjust if you mock models or specific methods
jest.mock('../../middleware/auth.middleware', () => ({
  isAuth: (req: Request, res: Response, next: NextFunction) => {
    next();
  },
  authorizeRoles: (roles:any) => (req: Request, res: Response, next: NextFunction) => next(),
}));

describe('Course API Integration Tests', () => {
  const mockCourseData = {
    get: jest.fn(() => ({
      id: 'course123',
      code: 'CS101',
      name: 'Introduction to Computer Science',
      creditHours: 3,
      level: 1,
      min_GPA: 2.5,
      minEarnedHours: 30,
    })),
  };

  const mockPrerequisitesData = {
    get: jest.fn(() => ({
      id: 'course123',
      name: 'Introduction to Computer Science',
      Prerequisite: [
        {
          id: 'course456',
          code: 'Cal101',
          name: 'Calculus I',
          creditHours: 4,
        },
      ],
    })),
  };

  beforeEach(() => {
    // Clear mock implementations before each test
    jest.clearAllMocks();
  });

  afterAll(() => { httpServer.close; });

  /**
   * Test GET /courses/:code
   */
  describe('GET /course/code/:code - getCourseByCode', () => {
    it('should return 200 and the course details when course is found', async () => {
      // Mock the method to find the course by code
      models.Course.findOne = jest.fn().mockResolvedValue(mockCourseData);

      const res = await request(httpServer).get('/course/code/CS101'); // Adjust the route to match your route setup

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('course');
      expect(res.body.course).toEqual(expect.objectContaining({ code: 'CS101' }));

      // Ensure the correct database query was made
      expect(models.Course.findOne).toHaveBeenCalledWith({
        where: { code: 'CS101' },
      });
    });

    it('should return 404 if course is not found', async () => {
      // Mock the method to return null when course is not found
      models.Course.findOne = jest.fn().mockResolvedValue(null);

      const res = await request(httpServer).get('/course/code/CS999'); // Course that doesn't exist

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('message', 'Course not found');
    });

    it('should handle server errors', async () => {
      // Mock the method to throw an error
      models.Course.findOne = jest.fn().mockRejectedValue(new Error('DB error'));

      const res = await request(httpServer).get('/course/code/CS101');

      expect(res.status).toBe(500); // Ensure server error status is returned
    });
  });

  /**
   * Test GET /courses/:courseId/prerequisites
   */
  describe('GET /course/:courseId/prerequisites - getCoursePrerequisites', () => {
    it('should return 200 and the course prerequisites', async () => {
      // Mock the method to find course prerequisites
      models.Course.findOne = jest.fn().mockResolvedValue(mockPrerequisitesData);

      const res = await request(httpServer).get('/course/course123/prerequisites');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('course');
      expect(res.body.course).toHaveProperty('Prerequisite');
      expect(res.body.course.Prerequisite).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ code: 'Cal101' }),
        ]),
      );

      // Ensure the correct database query was made
      expect(models.Course.findOne).toHaveBeenCalledWith({
        where: { id: 'course123' },
        include: [
          {
            model: models.Course,
            through: { attributes: [] },
          },
        ],
      });
    });

    it('should handle missing course with 404', async () => {
      // Mock the method to return null when course not found
      models.Course.findOne = jest.fn().mockResolvedValue(null);

      const res = await request(httpServer).get('/courses/course999/prerequisites'); // Non-existent course

      expect(res.status).toBe(404);
    });

    it('should handle server errors', async () => {
      // Mock the method to throw an error
      models.Course.findOne = jest.fn().mockRejectedValue(new Error('DB error'));

      const res = await request(httpServer).get('/courses/course123//prerequisites');

      expect(res.status).toBe(500);
    });
  });
});
