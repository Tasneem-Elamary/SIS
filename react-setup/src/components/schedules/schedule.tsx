import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { scheduleAction } from '../../state/actions';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import MainNavBar from '../shared/mainNavbar';
import RegisterationNavbar from '../shared/registerationNavbar';
import { Table } from 'reactstrap';
import './schedule.scss';
import ScheduleNavBar from './scheduleNav';

interface AllSchedulesrops {
    getAllSchedules: () => Promise<{ schedules: any[] }>;//any again and again :""(
}

const AllSchedules = ({ getAllSchedules }: AllSchedulesrops) => {// need to change any
    const [schedules, setSchedules] = useState<any[]>([]);
    const [times, setTimes] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllSchedule = async () => {

            try {
                const { schedules } = await getAllSchedules();

                if (schedules.length === 0) {
                    console.log('No schedules found for this room.');
                } else {
                    const uniqueTimes = Array.from(new Set(schedules.map((schedule: any) => {
                        return `${schedule.Slot.startTime.slice(0, 5)} - ${schedule.Slot.endTime.slice(0, 5)}`;
                    })));

                    setTimes(uniqueTimes.sort());
                }
                setSchedules(schedules);

            } catch (error) {
                console.error('Error fetching schedule:', error);
            }

        };

        fetchAllSchedule();
    }, [getAllSchedules]);

    const handleBackClick = () => {
        navigate('/logistics');
    };

    const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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
        <div className="page-container">
            <RegisterationNavbar />
            <MainNavBar activeItem="Schedule" />
            <ScheduleNavBar activeNav={2}/>

            <div className="fixed-title">
                 
                    <h3>All schedules</h3>
             
                <hr />


            </div>

            <div className="inside-container">
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
            </div>

            <button onClick={handleBackClick}>Back</button>
        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getAllSchedules: scheduleAction.getAllSchedules,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(AllSchedules);
