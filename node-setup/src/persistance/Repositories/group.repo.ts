import { GroupType, SectionType, StudentType } from '../../types';

interface GroupRepo {
  create(group: GroupType): Promise<GroupType | undefined>;
  getByGroupCode(groupCode: string): Promise<GroupType | undefined>;
  getById(id: string): Promise<GroupType | undefined>;
  getAll(): Promise<GroupType[] | undefined>;
  update(id: string, updateData: Partial<GroupType>): Promise<GroupType | undefined>;
  delete(id: string): Promise<boolean>;
  getStudentsInASpecificGroup(SectionId:string, CourseId: string): Promise<StudentType[]>;
  getSectionsInASpecificGroup(GroupId: string, CourseId: string):Promise<Partial<SectionType>[]>;
}

export default GroupRepo;
