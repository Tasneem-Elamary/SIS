import { ISectionRepo } from '../persistance/Repositories/section.repo';
import { SectionType } from '../types';
import { ISectionService } from './interfaces/ISection';

export class SectionService implements ISectionService {
  private sectionRepo: ISectionRepo;

  constructor(sectionRepo: ISectionRepo) {
    this.sectionRepo = sectionRepo;
  }

  async createSection(section: SectionType): Promise<SectionType> {
    return this.sectionRepo.create(section);
  }

  async getSectionById(id: string): Promise<SectionType | null> {
    return this.sectionRepo.getById(id);
  }

  async getSectionByCode(sectionCode: string): Promise<SectionType | null> {
    return this.sectionRepo.getBySectionCode(sectionCode);
  }

  async updateSection(id: string, section: Partial<SectionType>): Promise<void> {
    await this.sectionRepo.update(id, section);
  }

  async deleteSection(id: string): Promise<void> {
    await this.sectionRepo.delete(id);
  }
}
