import * as express from 'express';
import { departmentController } from '../../controller';
import { isAuth } from '../../middleware/auth.middleware';
import { validateCreateDepartment, validateUpdateDepartment, validateDepartmentId } from '../../middleware/validation/departmentValidation.middleware';

const router = express.Router();

router.post('/', validateCreateDepartment, departmentController.createDepartment);

router.get('/Faculty/:FacultyId', departmentController.getAllDepartmentsByFacultId);

router.get('/:id', validateDepartmentId, departmentController.getDepartmentById);

router.get('/Code/:code', departmentController.getDepartmentByCode);

router.put('/:id', validateUpdateDepartment, departmentController.updateDepartment);

router.delete('/:id', validateDepartmentId, departmentController.deleteDepartment);

export default router;
