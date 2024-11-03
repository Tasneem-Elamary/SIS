import * as express from 'express';
import { courseController } from '../../controller';
import { authorizeRoles, isAuth } from '../../middleware/auth.middleware';

import { validateCreateCourse, validateUpdateCourse, validateCourseId } from '../../middleware/validation/courseValidaton.middleware';

const router = express.Router();

router.route('/').post(validateCreateCourse).post(isAuth, authorizeRoles('university admin', 'faculty admin'), courseController.createCourse);

router.route('/:id').put(validateUpdateCourse).put(isAuth, authorizeRoles('university admin', 'faculty admin'), courseController.updateCourse);

router.route('/:id').delete(isAuth, authorizeRoles('university admin', 'faculty admin'), courseController.deleteCourse);

router.route('/').get(isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), courseController.getAllCourses);

router.route('/:id').get(isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), courseController.getCourseById);
router.route('/code/:code').get(isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), courseController.getCourseByCode);

router.post('/prerequisites', isAuth, authorizeRoles('university admin', 'faculty admin'), courseController.createCoursePrerequisites);

// Route to get course prerequisites by course ID
router.get('/:courseId/prerequisites', isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), courseController.getCoursePrerequisites);
router.get('/:prerequisiteId/dependants', isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), courseController.getCourseDependants);

router.post('/department', isAuth, authorizeRoles('university admin', 'faculty admin'), courseController.addCoursetoDepartment);

router.get('/level/:level', isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), courseController.getCoursesBylevel);

router.get('/:courseId/bylaw/:bylawId', isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant'), courseController.getCourseWithRegisteredStudentCounts);
// mapped courses

router.post('/bylaw-courses/mapped', courseController.addBylawMappedCourse);

router.get('/bylaw-courses/:bylawCourseId/mapped', courseController.getMappedCoursesForBylawCourseId);

router.get('/courses/:courseId/mapped-source', courseController.getCourseMappedToCourseId);

router.get('/bylaws/:bylawId/mapped-courses', courseController.getBylawMappedCourses);

export default router;
