import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { scheduleAction } from '../../state/actions';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';
import { Table } from 'reactstrap';
import './logistics.scss';

interface RoomScheduleProps {
    getRoomSchedule: (roomId: string) => Promise<{ schedules: any[], roomData: any }>;
}

const RoomSchedule = ({ getRoomSchedule }: RoomScheduleProps) => {
    const [schedules, setSchedules] = useState<any[]>([]);
    const [room, setRoom] = useState<any>(null);
    const [times, setTimes] = useState<string[]>([]);  // Dynamic times array
    const { roomId } = useParams<string>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomSchedule = async () => {
            if (roomId) {
                try {
                    const { schedules, roomData } = await getRoomSchedule(roomId);

                    if (schedules.length === 0) {
                        console.log('No schedules found for this room.');
                    } else {
                        console.log("Room result:", roomData);
                        console.log("Room code:", roomData.code);

                        // Dynamically create unique time slots from the schedules
                        const uniqueTimes = Array.from(new Set(schedules.map((schedule: any) => {
                            return `${schedule.Slot.startTime.slice(0, 5)} - ${schedule.Slot.endTime.slice(0, 5)}`;
                        })));

                        setTimes(uniqueTimes.sort());  // Sort the times for order
                    }

                    // Update the component state with fetched data
                    setSchedules(schedules);
                    setRoom(roomData);
                } catch (error) {
                    console.error('Error fetching room schedule:', error);
                }
            }
        };

        fetchRoomSchedule();
    }, [roomId, getRoomSchedule]);

    const handleBackClick = () => {
        navigate('/logistics');  
    };

    const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
 
    const findSchedule = (day: string, startTime: string, endTime: string) => {
        return schedules.find((schedule: any) => {
            const scheduleDay = schedule.Slot.day;
            const scheduleStartTime = schedule.Slot.startTime.slice(0, 5);  
            const scheduleEndTime = schedule.Slot.endTime.slice(0, 5);      
            return scheduleDay === day && scheduleStartTime === startTime && scheduleEndTime === endTime;
        });
    };


    const renderScheduleDetails = (schedule: any) => {
        if (!schedule) return null;
        const { Course, Instructor1,Instructor2, scheduleType, Group, Section } = schedule;
        return (
            <div>
                <div className='black-bold'><span className='blue-bold'>{Course.code} </span>- {Course.name}</div>
                <div className='blue-bold'><span className='black-bold'>- </span> {Instructor1.firstName} {Instructor2.lastName}</div>
                <div className='blue-bold'><span className='black-bold'>- </span>  {Instructor2.firstName} {Instructor2.lastName}</div>
                <div className='blue-bold'>Group: {Group.groupCode} | Section: {Section.sectionCode}</div>
                <div className='blue-bold'>{scheduleType}</div>
            </div>
        );
    };

    return (
        <div className="container555">
            <RegisterationNavbar />
            <MainNavBar activeItem="Logistics" />

            <div className="logistics-fixed-header">
                <div style={{ marginLeft: "10px" }}>
                    <h3>{room?.code || 'Loading...'}</h3>
                </div>
                <hr />
             <div className='header-room-details'><div><span className='black-bold'>Type: </span> {room?.type}</div>
             <div><span className='black-bold'>Capacity: </span> {room?.capacity}</div>
             </div>
                
            </div>

            <div className="room-schedule-container">
                <Table bordered striped >
                    <thead className='table-title'>
                        <tr style={{border:'none'}}>
                            <th style={{border:'none'}}>Day</th>
                            {times.map((time, index) => (
                                <th style={{border:'none'}} key={index} >{time}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="schedules">
                        {days.map((day, dayIndex) => (
                            <tr key={dayIndex}>
                                <td className='black-bold'>{day}</td>
                                {times.map((time, timeIndex) => {
                                    const [startTime, endTime] = time.split(' - ');
                                    const schedule = findSchedule(day, startTime, endTime);
                                    return (
                                        <td key={timeIndex}>
                                            {renderScheduleDetails(schedule)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <button onClick={handleBackClick}>Back</button>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getRoomSchedule: scheduleAction.getRoomSchedule,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(RoomSchedule);
