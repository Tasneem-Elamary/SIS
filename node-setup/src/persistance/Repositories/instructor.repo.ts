import { InstructorType, UserType } from '../../types';

interface InstructorRepo {
  create(instructor: InstructorType): Promise<InstructorType | undefined>;
  getById(id: string): Promise<(InstructorType & { User: UserType }) | undefined> ;
getByUserId(UserId: string): Promise<InstructorType | undefined>;
  getAll(): Promise<(InstructorType & { User: UserType })[] | undefined[]>;
  update(id: string, updatedData: Partial<InstructorType>): Promise<InstructorType | undefined>;
  delete(id: string): Promise<boolean>;
}

export default InstructorRepo;
