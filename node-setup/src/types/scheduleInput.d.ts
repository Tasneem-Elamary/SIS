type ScheduleInputType = {
  instructor1Code:string,
  instructor2Code?:string,
    scheduleType: 'lecture' | 'lab',
    roomCode: string,
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
