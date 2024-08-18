import { StudentType } from '../../types';

interface facultyAdminRepo {
  createStudent(student:StudentType): Promise<void>;
  // createInstructor(instructor:instructorType ): Promise<void>;
  // createCourse(course:courseType ): Promise<void>;
  // createSchedule(schedule:scheduleType ): Promise<void>;
  // createBylaw(bylaw:bylawType ): Promise<void>;

  // deleteStudent(id: string) : Promise<void>;
  // deleteInstructor(id: string): Promise<void>;
  // deleteCourse(id: string) : Promise<void>;
  // deleteSchedule(id: string) : Promise<void>;
  // deleteBylaw(id: string) : Promise<void>;

  }
export default facultyAdminRepo;
