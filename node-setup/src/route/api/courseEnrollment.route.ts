import { Router } from 'express';
import { courseEnrollmentController } from '../../controller';

const router = Router();

router.post('/', courseEnrollmentController.create);
router.get('/:id', courseEnrollmentController.getById);
router.get('/', courseEnrollmentController.getAll);
router.put('/:id', courseEnrollmentController.update);
router.delete('/:id', courseEnrollmentController.delete);

export default router;
