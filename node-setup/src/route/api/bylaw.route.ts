import * as express from 'express';
import bylawController from '../../controller/bylaw.controller';
import { authorizeRoles, isAuth } from '../../middleware/auth.middleware';

const router = express.Router();

// Routes for managing bylaws
router.post('/createBylaw', bylawController.create);
router.get('/:id', isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), bylawController.getById);
router.get('/limits/:id', bylawController.getBylawLimits);
router.get('/code/:code', bylawController.getByCode);
router.get('/', isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant', 'student'), bylawController.getAll);
router.put('/:id', bylawController.update);
router.delete('/:id', bylawController.delete);

// Routes for managing bylaw courses
router.post('/:bylawId/course/:courseId', bylawController.addCourseToBylaw);
router.get('/courses', bylawController.getAllBylawCourses);
router.delete('/:bylawId/course/:courseId', bylawController.removeCourseFromBylaw);
router.get('/:id/courses', bylawController.getBylawCourses);

// Routes for managing bylaw rules
router.post('/:bylawId/limits', bylawController.createBylawRules);
router.post('/:bylawId/grades', bylawController.createBylawGrades);
export default router;
