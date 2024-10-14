import * as express from 'express';
import { instructorController } from '../../controller';
import { authorizeRoles, isAuth } from '../../middleware/auth.middleware';

import {
  validateUpdateInstructor, ValidateCreateInstructor, validateInstructorId, validateStudentAdvisor,
} from '../../middleware/validation/instructorValidation.middleware';

const router = express.Router();
router.route('/').post(ValidateCreateInstructor).post(isAuth, authorizeRoles('university admin', 'faculty admin'), instructorController.createInstructor);

router.route('/').get(isAuth, authorizeRoles('university admin', 'faculty admin'), instructorController.getAllInstructors);
router.route('/TAs').get(isAuth, authorizeRoles('university admin', 'faculty admin'), instructorController.getAllTAs);
router.route('/Doctors').get(isAuth, authorizeRoles('university admin', 'faculty admin'), instructorController.getAllDoctors);

router.route('/Email/:email').get(instructorController.getInstructorByEmail);

router.route('/:id').get(validateInstructorId).get(isAuth, authorizeRoles('university admin', 'faculty admin', 'teaching assistant', 'professor'), instructorController.getInstructorById);

router.route('/:id').put(validateUpdateInstructor).put(isAuth, authorizeRoles('university admin', 'faculty admin'), instructorController.updateInstructor);

router.route('/:id').delete(validateInstructorId).delete(isAuth, authorizeRoles('university admin', 'faculty admin'), instructorController.deleteInstructor);

router.get('/:instructorId/students', isAuth, authorizeRoles('university admin', 'faculty admin', 'teaching assistant'), instructorController.getAdvisedStudents);

router.post('/:instructorId/students/:studentId', validateStudentAdvisor, isAuth, authorizeRoles('university admin', 'faculty admin'), instructorController.AdviseStudent);

router.delete('/:instructorId/students/:studentId', validateStudentAdvisor, isAuth, authorizeRoles('university admin', 'faculty admin'), instructorController.deleteAdvisedStudent);

router.put('/:instructorId/students/:studentId', validateStudentAdvisor, isAuth, authorizeRoles('university admin', 'faculty admin'), instructorController.updateAdvisedStudent);

router.get('/:instructorId/pendingStudents', isAuth, authorizeRoles('university admin', 'faculty admin', 'teaching assistant'), instructorController.getListOfPendingStudents);

router.get('/:instructorId/students/:enrollmentType', isAuth, authorizeRoles('university admin', 'faculty admin', 'teaching assistant'), instructorController.getSelfStudyOROverloadPendingStudents);

router.get('/:instructorId/courses', isAuth, authorizeRoles('university admin', 'faculty admin', 'professor'), instructorController.getDistinctCoursesByInstructor);

export default router;
