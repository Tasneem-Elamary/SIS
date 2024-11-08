import { Section, Student, StudentSchedule } from '../../models';
import { SectionType, StudentType } from '../../types';
import { ISectionRepo } from '../Repositories/section.repo';

export class SectionDataAccess implements ISectionRepo {
  async create(section: SectionType): Promise<SectionType> {
    const createdSection = await Section.create(section);
    return createdSection.toJSON();
  }

  async getById(id: string): Promise<SectionType | null> {
    const section = await Section.findByPk(id);
    return section ? section.toJSON() : null;
  }

  async getBySectionCode(sectionCode: string): Promise<SectionType | null> {
    const section = await Section.findOne({ where: { sectionCode } });
    return section ? section.toJSON() : null;
  }

  async getBySectionCodeAndCapacity(sectionCode: string, capacity:number): Promise<SectionType | null> {
    const section = await Section.findOne({ where: { sectionCode, capacity } });
    return section ? section.toJSON() : null;
  }

  async update(id: string, section: Partial<SectionType>): Promise<void> {
    await Section.update(section, { where: { id } });
  }

  async getStudentsInASpecificSection(CourseId: string, SectionId:string): Promise<StudentType[]> {
    const students = await StudentSchedule.findAll({
      where: { CourseId, SectionId },
      include: [{ model: Student }],
    });
    return students.map((student) => student.get({ plain: true }));
  }

  async delete(id: string): Promise<void> {
    await Section.destroy({ where: { id } });
  }
}
