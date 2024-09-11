import * as express from 'express';
import { FacultyController } from '../../controller';

const router = express.Router();

router.post('/createFaculty', FacultyController.create);

router.get('/:id', FacultyController.getById);

router.get('/', FacultyController.getAll);

router.put('/:id', FacultyController.update);

router.delete('/:id', FacultyController.delete);

export default router;
