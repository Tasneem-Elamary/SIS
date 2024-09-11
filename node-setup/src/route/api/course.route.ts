import * as express from 'express';
import { courseController } from '../../controller';
import { isAuth } from '../../middleware/auth.middleware';
import isUserValid from '../../middleware/userValidation.middleware';

const router = express.Router();

router.route('/').get(courseController.getAllCourses);

router.route('/:id').get(courseController.getCourseById);
router.route('/code/:code').get(courseController.getCourseByCode);

export default router;
