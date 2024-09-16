import { Router } from 'express';
import RoomController from '../../controller/room.controller';
import { isAuth } from '../../middleware/auth.middleware';
import isUserValid from '../../middleware/userValidation.middleware';

const router = Router();

router.post('/createRoom', RoomController.createRoom);
router.get('/:code', RoomController.getRoomByCode);
router.get('/id/:id', RoomController.getRoomById);
router.get('/', RoomController.getAllRooms);
router.put('/:id', isAuth, isUserValid, RoomController.updateRoom);
router.delete('/:id', isAuth, isUserValid, RoomController.deleteRoom);

export default router;
