 type RoomType = {
    id?: string;
    code: string;
    type: 'section' | 'lab' | 'hall';
    capacity: number;
    FacultyId?: string;
  };

export default RoomType;
