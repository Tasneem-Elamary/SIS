import { RoomType } from '../../types';

interface IRoom {
  create(room: RoomType, transaction?: any): Promise<RoomType | undefined>;
  getByCode(code: string): Promise<RoomType | undefined>;
  getById(id: string): Promise<RoomType | undefined>;
  getAll(): Promise<RoomType[] | undefined>;
  update(id: string, updateData: Partial<RoomType>, transaction?: any): Promise<RoomType | undefined>;
  delete(id: string, transaction?: any): Promise<boolean>;
}

export default IRoom;
