import * as express from 'express';
import { userController } from '../../controller';
import studentController from '../../controller/student.controller';
import { uploadCSV } from '../../middleware/fileUpload';
import { authorizeRoles, isAuth } from '../../middleware/auth.middleware';

const router = express.Router();

router.route('/createStudent')
  // .all(isStudentValid)
  .post(studentController.create);
router.route('/uploadCSVStudents')
  // .all(isStudentValid)
  .post(uploadCSV, studentController.uploadCSVStudents);

router.route('/getAllStudents')
  // .all(isStudentValid)
  .get(studentController.getAllStudents);

router.route('/:prefix/topStudents/:limit')
  .get(isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant'), studentController.getTopStudentsByGPA);

router.route('/:studentCode/rank')
  .get(isAuth, authorizeRoles('university admin', 'faculty admin', 'professor', 'teaching assistant'), studentController.getStudentRank);

router.route('/:id')
  // .all(isStudentValid)
  .get(studentController.getById);
// .delete(userController.getUserById)
// .patch(userController.getUserById)
// .put(userController.getUserById);
router.route('/updateStudent/:studentId')
  .put(studentController.updateStudent);
router.route('/deleteStudent/:studentId')
  .delete(studentController.deleteStudent);
router.route('/deleteStudents')
  .delete(studentController.deleteStudents);
router.route('/registerSchedule')
  .post(studentController.registerSchedule);
router.route('/registerSchedules/:StudentId')
  .post(studentController.registerSchedules);

router.route('/unregisterSchedule')
  .post(studentController.unregisterSchedule);
router.get('/course/:courseId/failed-or-unenrolled', studentController.getFailedOrNotEnrolledStudents);

router.route('/:studentId/RequestAprroved/:schedulecell')
  .patch(isAuth, authorizeRoles('university admin', 'faculty admin', 'teaching assistant'), studentController.ApproveRegularRequest);

router.route('/:studentId/RequestAprroved/:courseType/:courseCode')
  .patch(isAuth, authorizeRoles('university admin', 'faculty admin', 'teaching assistant'), studentController.ApproveSelfstudyOROverloadRequest);

router.route('/:studentId/RequestRejected/:schedulecell')
  .patch(isAuth, authorizeRoles('university admin', 'faculty admin', 'teaching assistant'), studentController.RejectRegularRequest);

router.route('/:studentId/RequestRejected/:courseType/:courseCode')
  .patch(isAuth, authorizeRoles('university admin', 'faculty admin', 'teaching assistant'), studentController.RejectSelfstudyRequestOROverload);

export default router;
