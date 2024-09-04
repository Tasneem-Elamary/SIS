import * as express from 'express';
import { facultyAdminContoller } from '../../controller';
import isAuth from '../../middleware/auth.middleware';
import isUserValid from '../../middleware/userValidation.middleware';

const router = express.Router();

router.route('/createInstructor').post(facultyAdminContoller.createInstructor);

router.route('/getAllInstructors').get(facultyAdminContoller.getAllInstructors);
router.route('/getAllTAs').get(facultyAdminContoller.getAllTAs);
router.route('/getAllDoctors').get(facultyAdminContoller.getAllDoctors);

router.route('/getInstructorById/:id').get(facultyAdminContoller.getInstructorById);

router.route('/getInstructorByEmail/Email/:email').get(facultyAdminContoller.getInstructorByEmail);

router.route('/updateInstructor/:id').put(facultyAdminContoller.updateInstructor);

router.route('/deleteInstructor/:id').delete(facultyAdminContoller.deleteInstructor);

router.route('/createCourse').post(facultyAdminContoller.createCourse);

router.route('/updateCourse/:id').put(facultyAdminContoller.updateCourse);

router.route('/deleteCourse/:id').delete(facultyAdminContoller.deleteCourse);

router.post('/createDepartment', facultyAdminContoller.createDepartment);

router.get('/getDepartmentById/:id', facultyAdminContoller.getDepartmentById);

router.get('/getDepartmentByCode/:code', facultyAdminContoller.getDepartmentByCode);

router.get('/getAllDepartments', facultyAdminContoller.getAllDepartments);

router.put('/updateDepartment/:id', facultyAdminContoller.updateDepartment);

router.delete('/deleteDepartment/:id', facultyAdminContoller.deleteDepartment);

router.route('/createGrade').post(facultyAdminContoller.createGrade);

router.route('/updateGrade/:id').put(facultyAdminContoller.updateGrade);

router.route('/deleteGrade/:id').delete(facultyAdminContoller.deleteGrade);

router.route('/createSemester').post(facultyAdminContoller.createSemester);

router.route('/updateSemester/:id').put(facultyAdminContoller.updateSemester);

router.route('/deleteSemester/:id').delete(facultyAdminContoller.deleteSemester);

router.post('/addStudentToAdvisor', facultyAdminContoller.addStudentToAdvisor);

router.delete('/removeStudentFromAdvisor/:instructorId/students/:studentId', facultyAdminContoller.removeStudentFromAdvisor);

router.put('updateStudentAdvisor/:instructorId/students/:studentId', facultyAdminContoller.updateStudentAdvisor);

export default router;
