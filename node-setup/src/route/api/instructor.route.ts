import * as express from 'express';
import scheduleController from '../../controller/schedule.controller';
import { isAuth } from '../../middleware/auth.middleware';
import isUserValid from '../../middleware/userValidation.middleware';

const router = express.Router();

// create a new schedule
router.route('/createSchedule').post(isAuth, isUserValid, scheduleController.createSchedule);

// get a schedule by ID
// router.route('/:id').get(isAuth, isUserValid, scheduleController.getScheduleById);

// update a schedule by ID
// router.route('/:id').put(isAuth, isUserValid, scheduleController.updateSchedule);

// delete a schedule by ID
// router.route('/:id').delete(isAuth, isUserValid, scheduleController.deleteSchedule);

export default router;
