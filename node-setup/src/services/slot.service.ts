import { SlotRepo } from '../persistance/Repositories/slot.repo';
import { SlotType } from '../types';
import { ISlot } from './interfaces/ISlot';

export class SlotService implements ISlot {
  private slot: SlotRepo;

  constructor(slotRepo: SlotRepo) {
    this.slot = slotRepo;
  }

  async createSlot(slot: SlotType): Promise<SlotType> {
    return this.slot.create(slot);
  }

  async getSlotById(id: string): Promise<SlotType | null> {
    return this.slot.getById(id);
  }

  async getSlotsByTimeRange(startTime: Date, endTime: Date): Promise<SlotType[]> {
    return this.slot.getByTimeRange(startTime, endTime);
  }

  async updateSlot(id: string, slot: Partial<SlotType>): Promise<void> {
    await this.slot.update(id, slot);
  }

  async deleteSlot(id: string): Promise<void> {
    await this.slot.delete(id);
  }
}
