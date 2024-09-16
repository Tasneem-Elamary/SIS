import { SectionType } from '../../types';

export interface ISectionService {
    createSection(section: SectionType): Promise<SectionType>;
    getSectionById(id: string): Promise<SectionType | null>;
    getSectionByCode(sectionCode: string): Promise<SectionType | null>;
    updateSection(id: string, section: Partial<SectionType>): Promise<void>;
    deleteSection(id: string): Promise<void>;
}
