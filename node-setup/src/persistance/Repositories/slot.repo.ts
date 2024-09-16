import { SlotType } from '../../types'; // Adjust path as necessary

export interface SlotRepo {
    create(slot: SlotType): Promise<SlotType>;
    getById(id: string): Promise<SlotType | null>;
    getByTimeRange(startTime: Date, endTime: Date): Promise<SlotType|undefined>;
    update(id: string, slot: Partial<SlotType>): Promise<void>;
    delete(id: string): Promise<void>;
}
