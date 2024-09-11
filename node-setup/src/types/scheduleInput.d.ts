type ScheduleInputType = {
    instructorId: string,
    scheduleType: 'lecture' | 'lab',
    roomCode: string,
    semesterId: string,
    groupCode: string,
    groupCapacity: number,
    sectionCode: string,
    sectionCapacity: number,
    courseCode: string,
    startTime: Date,
    endTime: Date,
    day: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday',
  };
export default ScheduleInputType;
