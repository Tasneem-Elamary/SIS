import * as express from 'express';
import { instructorController } from '../../controller';
import isAuth from '../../middleware/auth.middleware';
import isUserValid from '../../middleware/userValidation.middleware';

const router = express.Router();

router.route('/').get(instructorController.viewprofile);

router.route('/').put(instructorController.editprofile);

router.get('/:instructorId/students', instructorController.getStudentsByAdvisor);

router.route('/uploadStudentsResults').post(instructorController.uploadStudentsResults);
router.route('/updateResultById/:id').post(instructorController.updateResultById);

export default router;
