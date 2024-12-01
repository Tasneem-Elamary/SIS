
import { Table } from 'reactstrap';



const Schedule = ({ schedules }) => {// need to change any

    const findSchedules = (day: string, startTime: string, endTime: string) => {
        return schedules.filter((schedule: any) => {
            const scheduleDay = schedule.Slot.day;
            const scheduleStartTime = schedule.Slot.startTime.slice(0, 5);
            const scheduleEndTime = schedule.Slot.endTime.slice(0, 5);
            return scheduleDay === day && scheduleStartTime === startTime && scheduleEndTime === endTime;
        });
    };


    const renderSchedulesDetails = (schedules: any[]) => {
        if (schedules.length == 0) return null;

        return (

            <ul>{schedules.map((schedule) => (<li>
                <div className='black-bold'><span className='blue-bold'>{schedule.Course.code} </span>- {schedule.Course.name}</div>
                <div className='black-bold'><span className='blue-bold'>{schedule.Room.code} </span></div>
                <div className='blue-bold'>- {schedule.Instructor1.firstName} {schedule.Instructor1.lastName}</div>
                <div className='blue-bold'>- {schedule.Instructor2.firstName} {schedule.Instructor2.lastName}</div>
                <div className='blue-bold'>Group: {schedule.Group.groupCode} | Section: {schedule.Section.sectionCode}</div>
                <div className='black-bold'>{schedule.scheduleType}</div></li>)
                )
                }

            </ul>
        );
    };

    return (

                <Table bordered striped >
                    <thead className='table-title'>
                        <tr style={{ border: 'none' }}>
                            <th style={{ border: 'none' }}>Day</th>
                            {times.map((time, index) => (
                                <th style={{ border: 'none' }} key={index} >{time}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="schedules">
                        {days.map((day, dayIndex) => (
                            <tr key={dayIndex}>
                                <td className='black-bold'>{day}</td>
                                {times.map((time, timeIndex) => {
                                    const [startTime, endTime] = time.split(' - ');
                                    const schedule = findSchedules(day, startTime, endTime);
                                    return (
                                        <td key={timeIndex}>
                                            {renderSchedulesDetails(schedule)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </Table>

    );
};



export default Schedule;
