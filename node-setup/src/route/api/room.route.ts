import { Router } from 'express';
import RoomController from '../../controller/room.controller';
import { isAuth } from '../../middleware/auth.middleware';

const router = Router();

router.post('/createRoom', RoomController.createRoom);
router.get('/:code', RoomController.getRoomByCode);
router.get('/id/:id', RoomController.getRoomById);
router.get('/', RoomController.getAllRooms);
router.put('/:id', isAuth, RoomController.updateRoom);
router.delete('/:id', isAuth, RoomController.deleteRoom);

export default router;
