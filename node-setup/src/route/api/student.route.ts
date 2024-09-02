import * as express from 'express';
import { userController } from '../../controller';
import isAuth from '../../middleware/auth.middleware';
import isUserValid from '../../middleware/userValidation.middleware';
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
export default router;
