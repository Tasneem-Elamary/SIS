 type RoomType = {
    id?: string;
    code: string;
    type: 'section' | 'lab' | 'hall';
    capacity: number;
    facultyId: string;
  };

export default RoomType;
