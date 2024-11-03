import * as express from 'express';
import { auditController } from '../../controller';

const router = express.Router();
router.get('/', auditController.getAll);

router.get('/:userId', auditController.getByuserId);

export default router;
