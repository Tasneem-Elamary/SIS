import { RoomType } from '../types';
import IRoom from './interfaces/IRoom';

class RoomService {
  private roomRepo: IRoom;

  constructor(roomRepo: IRoom) {
    this.roomRepo = roomRepo;
  }

  async createRoom(roomData: RoomType): Promise<RoomType | undefined> {
    try {
      // Business logic (e.g., checking if room already exists by code) can be added here
      const existingRoom = await this.roomRepo.getByCode(roomData.code);
      if (existingRoom) {
        throw new Error('Room with this code already exists');
      }
      const newRoom = await this.roomRepo.create(roomData);
      return newRoom;
    } catch (error) {
      console.error('Failed to create room:', error);
      throw error;
    }
  }

  async getRoomByCode(code: string): Promise<RoomType | undefined> {
    try {
      const room = await this.roomRepo.getByCode(code);
      return room;
    } catch (error) {
      console.error('Failed to get room by code:', error);
      throw error;
    }
  }

  async getRoomById(id: string): Promise<RoomType | undefined> {
    try {
      const room = await this.roomRepo.getById(id);
      return room;
    } catch (error) {
      console.error('Failed to get room by ID:', error);
      throw error;
    }
  }

  async getAllRooms(): Promise<RoomType[] | undefined> {
    try {
      const rooms = await this.roomRepo.getAll();
      return rooms;
    } catch (error) {
      console.error('Failed to get all rooms:', error);
      throw error;
    }
  }

  async updateRoom(id: string, updateData: Partial<RoomType>): Promise<RoomType | undefined> {
    try {
      const updatedRoom = await this.roomRepo.update(id, updateData);
      return updatedRoom;
    } catch (error) {
      console.error('Failed to update room:', error);
      throw error;
    }
  }

  async deleteRoom(id: string): Promise<boolean> {
    try {
      const isDeleted = await this.roomRepo.delete(id);
      return isDeleted;
    } catch (error) {
      console.error('Failed to delete room:', error);
      throw error;
    }
  }
}

export default RoomService;
