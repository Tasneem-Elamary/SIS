import { Router } from 'express';
import userRoute from './api/user.route';
import studentRoutes from './api/student.route';
import BylawRoutes from './api/bylaw.route';
import facultyAdminRoute from './api/facultyAdmin.route';
import instructorRoute from './api/instructor.route';
import courseRoute from './api/course.route';
import departmentRoute from './api/department.route';
import gradeRoute from './api/grade.route';
import semsterRoute from './api/semster.route';
import resultRoute from './api/result.route';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/student', studentRoutes);
routes.use('/bylaw', BylawRoutes);
routes.use('/facultyAdmin', facultyAdminRoute);
routes.use('/instructor', instructorRoute);
routes.use('/course', courseRoute);
routes.use('/department', departmentRoute);
routes.use('/grade', gradeRoute);
routes.use('/semster', semsterRoute);
routes.use('/result', resultRoute);

export default routes;
