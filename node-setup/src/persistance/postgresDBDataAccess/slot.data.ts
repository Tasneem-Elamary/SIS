import { Op } from 'sequelize';
import { Slot } from '../../models';
import { SlotType } from '../../types';
import { SlotRepo } from '../Repositories/slot.repo';

export class SlotDataAccess implements SlotRepo {
  async create(slot: SlotType): Promise<SlotType> {
    const createdSlot = await Slot.create(slot);
    return createdSlot.toJSON();
  }

  async getById(id: string): Promise<SlotType | null> {
    const slot = await Slot.findByPk(id);
    return slot ? slot.toJSON() : null;
  }

  async getByTimeRange(startTime: Date, endTime: Date): Promise<SlotType|undefined> {
    const slot = await Slot.findOne({
      where: {
        startTime, endTime,
      },

    });

    return slot ? (slot.toJSON() as SlotType) : undefined;
  }

  async update(id: string, slot: Partial<SlotType>): Promise<void> {
    await Slot.update(slot, { where: { id } });
  }

  async delete(id: string): Promise<void> {
    await Slot.destroy({ where: { id } });
  }
}
