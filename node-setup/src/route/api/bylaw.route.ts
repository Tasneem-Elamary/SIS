import * as express from 'express';
import { bylawController } from '../../controller';

const router = express.Router();

router.post('/createBylaw', bylawController.create);

router.get('/:id', bylawController.getById);

router.get('/code/:code', bylawController.getByCode);

router.put('/:id', bylawController.update);

router.delete('/:id', bylawController.delete);

export default router;
