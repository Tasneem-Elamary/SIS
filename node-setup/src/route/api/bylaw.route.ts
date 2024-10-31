import * as express from 'express';
import bylawController from '../../controller/bylaw.controller';

const router = express.Router();

// Routes for managing bylaws
router.post('/createBylaw', bylawController.create);
router.get('/:id', bylawController.getById);
router.get('/limits/:id', bylawController.getBylawLimits);
router.get('/code/:code', bylawController.getByCode);
router.get('/', bylawController.getAll);
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
