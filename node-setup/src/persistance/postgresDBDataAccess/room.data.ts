import { Room } from '../../models';
import { db } from '../../../config/postgresDB.config';
import { RoomType } from '../../types';
import RoomRepo from '../Repositories/room.repo';

class RoomDataAccess implements RoomRepo {
  async create(room: RoomType, transaction?: any): Promise<RoomType | undefined> {
    try {
      const newRoom = await Room.create(room, { transaction });
      return newRoom.get();
    } catch (error) {
      console.error('Failed to create the room:', error);
      throw new Error('Failed to create the room, please try again!');
    }
  }

  async getByCode(code: string): Promise<RoomType | undefined> {
    try {
      const room = await Room.findOne({ where: { code } });
      return room ? (room.get() as RoomType) : undefined;
    } catch (error) {
      console.error('Failed to find the room by code:', error);
      throw new Error('Failed to find the room, please try again!');
    }
  }

  async getById(id: string): Promise<RoomType | undefined> {
    try {
      const room = await Room.findOne({ where: { id } });
      return room ? (room.get() as RoomType) : undefined;
    } catch (error) {
      console.error('Failed to find the room by ID:', error);
      throw new Error('Failed to find the room, please try again!');
    }
  }

  async getAll(): Promise<RoomType[] | undefined> {
    try {
      const rooms = await Room.findAll();
      return rooms.map((room) => room.get() as RoomType);
    } catch (error) {
      console.error('Failed to get all rooms:', error);
      throw new Error('Failed to get all rooms, please try again!');
    }
  }

  async update(id: string, updateData: Partial<RoomType>, transaction?: any): Promise<RoomType | undefined> {
    try {
      const room = await Room.findByPk(id, { transaction });

      if (!room) {
        console.error('Room not found');
        return undefined;
      }

      await room.update(updateData, { transaction });
      return room.get() as RoomType;
    } catch (error) {
      console.error('Failed to update room:', error);
      throw new Error('Failed to update the room, please try again!');
    }
  }

  async delete(id: string, transaction?: any): Promise<boolean> {
    try {
      const room = await Room.findByPk(id, { transaction });

      if (!room) {
        console.error('Room not found');
        return false;
      }

      await room.destroy({ transaction });
      return true;
    } catch (error) {
      console.error('Failed to delete room:', error);
      throw new Error('Failed to delete the room, please try again!');
    }
  }
}

export default RoomDataAccess;
