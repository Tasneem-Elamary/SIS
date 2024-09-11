import { Router } from 'express';
import userRoute from './api/user.route';
import studentRoutes from './api/student.route';
import BylawRoutes from './api/bylaw.route';
import facultyAdminRoute from './api/facultyAdmin.route';
import instructorRoute from './api/instructor.route';
import courseRoute from './api/course.route';
import roomRoute from './api/room.route';
import facultyRoute from './api/faculty.route';
import semesterRoute from './api/semester.route';
import scheduleRoute from './api/schedule.route';
import courseEnrollmentRoute from './api/courseEnrollment.route';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/student', studentRoutes);
routes.use('/bylaw', BylawRoutes);
routes.use('/facultyAdmin', facultyAdminRoute);
routes.use('/instructor', instructorRoute);
routes.use('/course', courseRoute);
routes.use('/room', roomRoute);
routes.use('/faculty', facultyRoute);
routes.use('/semester', semesterRoute);
routes.use('/schedule', scheduleRoute);
routes.use('/enrollment', courseEnrollmentRoute);

export default routes;
