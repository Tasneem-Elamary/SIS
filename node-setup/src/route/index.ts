import { Router } from 'express';
import userRoute from './api/user.route';
import studentRoutes from './api/student.route';
import BylawRoutes from './api/bylaw.route';

const routes = Router();

routes.use('/user', userRoute);
routes.use('/student', studentRoutes);
routes.use('/bylaw', BylawRoutes);
export default routes;
