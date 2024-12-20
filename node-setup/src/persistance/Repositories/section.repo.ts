import { SectionType, StudentType } from '../../types';

export interface ISectionRepo {
    create(section: SectionType): Promise<SectionType>;
    getById(id: string): Promise<SectionType | null>;
    getBySectionCode(sectionCode: string): Promise<SectionType | null>;
    getBySectionCodeAndCapacity(sectionCode: string, capacity:number): Promise<SectionType | null>;
    getStudentsInASpecificSection(SectionId: string, CourseId: string): Promise<StudentType[]>
    update(id: string, section: Partial<SectionType>): Promise<void>;
    delete(id: string): Promise<void>;
}
