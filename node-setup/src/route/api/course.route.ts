import * as express from 'express';
import { courseController } from '../../controller';
import isAuth from '../../middleware/auth.middleware';

import { validateCreateCourse, validateUpdateCourse, validateCourseId } from '../../middleware/validation/courseValidaton.middleware';

const router = express.Router();

router.route('/').post(validateCreateCourse).post(courseController.createCourse);

router.route('/:id').put(validateUpdateCourse).put(courseController.updateCourse);

router.route('/:id').delete(courseController.deleteCourse);

router.route('/').get(courseController.getAllCourses);

router.route('/:id').get(courseController.getCourseById);
router.route('/code/:code').get(courseController.getCourseByCode);

router.post('/prerequisites', courseController.createCoursePrerequisites);

// Route to get course prerequisites by course ID
router.get('/:courseId/prerequisites', courseController.getCoursePrerequisites);
router.get('/:prerequisiteId/dependants', courseController.getCourseDependants);

router.post('/department', courseController.addCoursetoDepartment);

router.get('/level/:level', courseController.getCoursesBylevel);

router.get('/:courseId/bylaw/:bylawId', courseController.getCourseWithRegisteredStudentCounts);

export default router;
