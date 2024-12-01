import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import './viewtable.scss';

interface Schedule {
  Slot: {
    startTime: string;
    endTime: string;
    day: string;
  };
  Course: {
    code: string;
    name: string;
  };
  Instructor1: {
    firstName: string;
    lastName: string;
  };
  Instructor2: {
    firstName: string;
    lastName: string;
  };
  Group: {
    groupCode: string;
  };
  Section: {
    sectionCode: string;
  };
  scheduleType: string;
  cell: number;
  level: number;
}

const ViewSchedule = ({ schedules }: { schedules: Schedule[] }) => {
  const [times, setTimes] = useState<string[]>([]);  
  console.log("debugview schedule",schedules)

  useEffect(() => {
    if (schedules && schedules.length > 0) {
      const uniqueTimes = Array.from(
        new Set(
          schedules.map((schedule) => {
  console.log("debugview schedule",)

            const startTime = schedule?.Slot?.startTime.slice(0, 5);
            const endTime = schedule?.Slot?.endTime.slice(0, 5);
            return `${startTime} - ${endTime}`;
          })
        )
      );
      setTimes(uniqueTimes.sort());
    }
  }, [schedules]);   

  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const findSchedules = (day: string, startTime: string, endTime: string) => {
    return schedules.filter((schedule) => {
      const scheduleDay = schedule?.Slot?.day;
      const scheduleStartTime = schedule?.Slot?.startTime.slice(0, 5);
      const scheduleEndTime = schedule?.Slot?.endTime.slice(0, 5);
      return scheduleDay === day && scheduleStartTime === startTime && scheduleEndTime === endTime;
    });
  };

  return (
    <Table bordered striped>
      <thead className='table-title'>
        <tr style={{ border: 'none' }}>
          <th style={{ border: 'none' }}>Day</th>
          {times.map((time, index) => (
            <th style={{ border: 'none' }} key={index}>{time}</th>
          ))}
        </tr>
      </thead>
      <tbody className="schedules">
        {days.map((day, dayIndex) => (
          <tr key={dayIndex}>
            <td className='black-bold'>{day}</td>
            {times.map((time, timeIndex) => {
              const [startTime, endTime] = time.split(' - ');
              const schedules = findSchedules(day, startTime, endTime);
              return (
                <td key={timeIndex}>
                  {schedules.map((schedule) => (
                    <div key={schedule?.Course?.code}>
                      <div className='black-bold'>
                        <span className='blue-bold'>{schedule?.Course?.code} </span>- {schedule?.Course?.name}
                      </div>
                      <div className='blue-bold'>{schedule?.Instructor1?.firstName} {schedule?.Instructor1?.lastName}</div>
                      <div className='blue-bold'>{schedule?.Instructor2?.firstName} {schedule?.Instructor2?.lastName}</div>
                      <div className='blue-bold'>Group: {schedule?.Group?.groupCode} | Section: {schedule?.Section?.sectionCode}</div>
                      <div className='blue-bold'>{schedule?.scheduleType}</div>
                    </div>
                  ))}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ViewSchedule;
