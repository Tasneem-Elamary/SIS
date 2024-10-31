import { Router } from 'express';
import SemesterController from '../../controller/semester.controller';
import { isAuth } from '../../middleware/auth.middleware';

const router = Router();

router.post('/createSemester', SemesterController.createSemester);

export default router;
