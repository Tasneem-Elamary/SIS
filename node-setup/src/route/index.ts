import { Router } from 'express';
import userRoute from './api/user.route';
import studentRoutes from './api/student.route';
import BylawRoutes from './api/bylaw.route';
import facultyAdminRoute from './api/facultyAdmin.route';
import instructorRoute from './api/instructor.route';
import courseRoute from './api/course.route';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/student', studentRoutes);
routes.use('/bylaw', BylawRoutes);
routes.use('/facultyAdmin', facultyAdminRoute);
routes.use('/instructor', instructorRoute);
routes.use('/course', courseRoute);

export default routes;
