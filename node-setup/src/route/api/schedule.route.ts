import { Router } from 'express';
import ScheduleController from '../../controller/schedule.controller';
import { authorizeRoles, isAuth } from '../../middleware/auth.middleware';

import { uploadCSV } from '../../middleware/fileUpload';

const router = Router();

router.post('/createSchedule', ScheduleController.createSchedule);
router.post('/uploadCSVSchedule', uploadCSV, ScheduleController.uploadCSVSchedules);
router.get('/:id', ScheduleController.getSchedule);
router.put('/:id', ScheduleController.updateSchedule);
router.delete('/:id', ScheduleController.deleteSchedule);
router.get('/instructor/:id', ScheduleController.getInstructorSchedules);
router.get('/room/:id', ScheduleController.getRoomSchedules);
// router.get('/room/:id', isAuth, authorizeRoles('professor', 'student'), ScheduleController.getRoomSchedules);
router.get('/course/:id', ScheduleController.getCourseSchedules);
// router.get('/:code', RoomController.getRoomByCode);
// router.get('/id/:id', RoomController.getRoomById);
// router.get('/', isAuth, isUserValid, RoomController.getAllRooms);
// router.put('/:id', isAuth, isUserValid, RoomController.updateRoom);
// router.delete('/:id', isAuth, isUserValid, RoomController.deleteRoom);

export default router;
