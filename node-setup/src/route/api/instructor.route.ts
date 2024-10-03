import * as express from 'express';
import { instructorController } from '../../controller';

import {
  validateUpdateInstructor, ValidateCreateInstructor, validateInstructorId, validateStudentAdvisor,
} from '../../middleware/validation/instructorValidation.middleware';

const router = express.Router();
router.route('/createInstructor').post(ValidateCreateInstructor).post(instructorController.createInstructor);

router.route('/getAllInstructors').get(instructorController.getAllInstructors);
router.route('/getAllTAs').get(instructorController.getAllTAs);
router.route('/getAllDoctors').get(instructorController.getAllDoctors);

router.route('/getInstructorById/:id').get(validateInstructorId).get(instructorController.getInstructorById);

router.route('/getInstructorByEmail/Email/:email').get(instructorController.getInstructorByEmail);

router.route('/updateInstructor/:id').put(validateUpdateInstructor).put(instructorController.updateInstructor);

router.route('/deleteInstructor/:id').delete(validateInstructorId).delete(instructorController.deleteInstructor);

router.get('/:instructorId/students', instructorController.getAdvisedStudents);

router.post('/:instructorId/students/:studentId', validateStudentAdvisor, instructorController.AdviseStudent);

router.delete('/:instructorId/students/:studentId', validateStudentAdvisor, instructorController.deleteAdvisedStudent);

router.put('/:instructorId/students/:studentId', validateStudentAdvisor, instructorController.updateAdvisedStudent);

router.get('/:instructorId/pendingStudents', instructorController.getListOfPendingStudents);

router.get('/:instructorId/students/:enrollmentType', instructorController.getSelfStudyOROverloadPendingStudents);

router.get('/:instructorId/courses', instructorController.getDistinctCoursesByInstructor);

export default router;
