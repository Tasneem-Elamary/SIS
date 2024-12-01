import { Router } from 'express';
import ScheduleController from '../../controller/schedule.controller';
import { authorizeRoles, isAuth } from '../../middleware/auth.middleware';
import {
  validateScheduleCreation,
  validateScheduleId,
  validateInstructorId,
  validateStudentId,
  validateRoomId,
  validateCourseId,
  validateSectionParams,
  validateCSVScheduleUpload,
} from '../../middleware/validation/scheduleValidation.middleware';
import { uploadCSV } from '../../middleware/fileUpload';
import { parseCSVFile } from '../../middleware/parseCSV';

const router = Router();

router.post('/createSchedule', validateScheduleCreation, ScheduleController.createSchedule);
router.post('/uploadCSVSchedule', uploadCSV, parseCSVFile, validateCSVScheduleUpload, ScheduleController.uploadCSVSchedules);
router.get('/:id', ScheduleController.getSchedule);
router.put('/:id', ScheduleController.updateSchedule);
router.delete('/deleteSchedule/:id', ScheduleController.deleteSchedule);
router.delete('/deleteSchedules', ScheduleController.deleteSchedules);
router.get('/instructor/:id', validateScheduleId, ScheduleController.getInstructorSchedules);
router.get('/group/sections/:GroupId/:CourseId', ScheduleController.getGroupSections);
router.get('/group/students/:GroupId/:CourseId', ScheduleController.getGroupStudents);
router.get('/section/students/:SectionId/:CourseId', ScheduleController.getSectionStudents);
router.get('/student/:id', ScheduleController.getStudentSchedules);
router.get('/student/pending/:id', ScheduleController.getStudentPendingSchedules);
router.get('/student/register/:id', ScheduleController.getStudentToRegisterSchedules);
// router.get('/room/:id', ScheduleController.getRoomSchedules);
router.get('/room/:id', isAuth, authorizeRoles('professor', 'student', 'faculty admin', 'university admin', 'teaching assistant'), ScheduleController.getRoomSchedules);
router.get('/course/:id', ScheduleController.getCourseSchedules);
router.get('/', ScheduleController.getAllSchedules);
// router.get('/:code', RoomController.getRoomByCode);
// router.get('/id/:id', RoomController.getRoomById);
// router.get('/', isAuth, isUserValid, RoomController.getAllRooms);
// router.put('/:id', isAuth, isUserValid, RoomController.updateRoom);
// router.delete('/:id', isAuth, isUserValid, RoomController.deleteRoom);

export default router;
