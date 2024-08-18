type ScheduleType ={
    id?:string,
    type: 'lab' | 'lecture';
    groupID: string,
    sectionID: string,
    slotID: string,
    roomID: string,
    courseID: string,
    instructorID: string,
    semesterID: string,
    };
export default ScheduleType;
