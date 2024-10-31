import { Router } from 'express';
import { courseEnrollmentController } from '../../controller';

const router = Router();

router.post('/', courseEnrollmentController.create);
router.get('/:id', courseEnrollmentController.getById);
router.get('/', courseEnrollmentController.getAll);
router.put('/:id', courseEnrollmentController.update);
router.delete('/:id', courseEnrollmentController.delete);
router.post('/overload', courseEnrollmentController.requestOverload);
router.post('/overload', courseEnrollmentController.requestOverload);
router.post('/request', courseEnrollmentController.request);
router.post('/requestByStudentCode', courseEnrollmentController.requestByStudentCode);
router.post('/regular', courseEnrollmentController.requestRegular);
router.get('/:studentId/allowed-courses', courseEnrollmentController.getCoursesStudentAllowedToEnroll);

export default router;
