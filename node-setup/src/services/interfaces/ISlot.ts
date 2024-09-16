import { SlotType } from '../../types';

export interface ISlot {
    createSlot(slot: SlotType): Promise<SlotType>;
    getSlotById(id: string): Promise<SlotType | null>;
    getSlotsByTimeRange(startTime: Date, endTime: Date): Promise<SlotType[]>;
    updateSlot(id: string, slot: Partial<SlotType>): Promise<void>;
    deleteSlot(id: string): Promise<void>;
}
