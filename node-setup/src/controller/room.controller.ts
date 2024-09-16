import { Request, Response, NextFunction } from 'express';
import RoomDataAccess from '../persistance/postgresDBDataAccess/room.data';
import RoomService from '../services/room.service';

class RoomController {
  private roomService: RoomService;

  constructor() {
    const roomRepo = new RoomDataAccess(); // Assuming you have a RoomDataAccess implementation
    this.roomService = new RoomService(roomRepo);
  }

  public createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        code, type, capacity, FacultyId,
      } = req.body;
      const room = await this.roomService.createRoom({
        code, type, capacity, FacultyId,
      });
      res.status(201).json({ message: 'Room created successfully', room });
    } catch (error) {
      next(error);
    }
  };

  public getRoomByCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;
      const room = await this.roomService.getRoomByCode(code);
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  };

  public getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const room = await this.roomService.getRoomById(id);
      res.status(200).json(room);
    } catch (error) {
      next(error);
    }
  };

  public getAllRooms = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const rooms = await this.roomService.getAllRooms();
      res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  };

  public updateRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedRoom = await this.roomService.updateRoom(id, updateData);
      res.status(200).json({ message: 'Room updated successfully', updatedRoom });
    } catch (error) {
      next(error);
    }
  };

  public deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const isDeleted = await this.roomService.deleteRoom(id);
      res.status(200).json({ message: isDeleted ? 'Room deleted successfully' : 'Room not found' });
    } catch (error) {
      next(error);
    }
  };
}

export default new RoomController();
