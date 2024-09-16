import * as express from 'express';
import { resultController } from '../../controller';
import { isAuth } from '../../middleware/auth.middleware';

import { validategetStudentCourseResult, validategetStudentResult, validategetStudentSemesterResult } from '../../middleware/validation/resultValidation.middleware';
import { uploadCSV } from '../../middleware/fileUpload';

const router = express.Router();

router.route('/').post(uploadCSV, resultController.uploadStudentsResults);
router.route('/:id').post(resultController.updateResultById);
router.get('/:studentId', validategetStudentResult, resultController.getStudentResult);
router.get('/:studentId/:courseId/:semesterId', validategetStudentCourseResult, resultController.getStudentCourseResult);
router.get('/:studentId/:semesterId', validategetStudentSemesterResult, resultController.getStudentSemesterResult);
export default router;
