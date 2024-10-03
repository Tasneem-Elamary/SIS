import * as express from 'express';
import { userController } from '../../controller';

import studentController from '../../controller/student.controller';
import { uploadCSV } from '../../middleware/fileUpload';

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
  .get(studentController.getTopStudentsByGPA);

router.route('/:studentCode/rank')
  .get(studentController.getStudentRank);

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
router.route('/registerSchedule')
  .post(studentController.registerSchedule);

router.route('/unregisterSchedule')
  .post(studentController.unregisterSchedule);

router.route('/:studentId/RequestAprroved/:schedulecell')
  .patch(studentController.ApproveRegularRequest);

router.route('/:studentId/RequestAprroved/:courseType/:courseCode')
  .patch(studentController.ApproveSelfstudyOROverloadRequest);

router.route('/:studentId/RequestRejected/:schedulecell')
  .patch(studentController.RejectRegularRequest);

router.route('/:studentId/RequestRejected/:courseType/:courseCode')
  .patch(studentController.RejectSelfstudyRequestOROverload);

export default router;
