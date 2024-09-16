import { RoomType } from '../../types';

interface RoomRepo {
  create(room: RoomType): Promise<RoomType | undefined>;
  getByCode(code: string): Promise<RoomType | undefined>;
  getById(id: string): Promise<RoomType | undefined>;
  getAll(): Promise<RoomType[] | undefined>;
  update(id: string, updateData: Partial<RoomType>): Promise<RoomType | undefined>;
  delete(id: string): Promise<boolean>;
}

export default RoomRepo;
