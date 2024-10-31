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
import InstructorNavbar from '../User/Instructor/TA/TANavbar'

interface InstructorScheduleProps {
    getInstructorSchedule: (instructorId: string) => Promise<{ schedules: any[], instructorData: any }>;
}

const InstructorSchedule = ({ getInstructorSchedule }: InstructorScheduleProps) => {
    const [schedules, setSchedules] = useState<any[]>([]);
    const [instructorData, setInstructorData] = useState<any>(null);
    const [times, setTimes] = useState<string[]>([]);  // Dynamic times array
    const { instructorId } = useParams<string>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInstructorchedule = async () => {
            if (instructorId) {
                try {
                    const { schedules, instructorData } = await getInstructorSchedule(instructorId);

                    if (schedules){
                         console.log("instructorData result:", instructorData);
                 

                        // Dynamically create unique time slots from the schedules
                        const uniqueTimes = Array.from(new Set(schedules.map((schedule: any) => {
                            return `${schedule.Slot.startTime.slice(0, 5)} - ${schedule.Slot.endTime.slice(0, 5)}`;
                        })));

                        setTimes(uniqueTimes.sort());  // Sort the times for order
                    }

                    // Update the component state with fetched data
                    setSchedules(schedules);
                    setInstructorData(instructorData);
                } catch (error) {
                    console.error('Error fetching room schedule:', error);
                }
            }
        };

        fetchInstructorchedule();
    }, [instructorId, getInstructorSchedule]);

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
        const { Course, Instructor, scheduleType, Group, Section } = schedule;
        return (
            <div>
                <div className='black-bold'><span className='blue-bold'>{Course.code} </span>- {Course.name}</div>
                <div className='blue-bold'>Group: {Group.groupCode} | Section: {Section.sectionCode}</div>
                <div className='blue-bold'>{scheduleType}</div>
            </div>
        );
    };

    return (
        <div className="page-container">
            <RegisterationNavbar />
            <MainNavBar activeItem="Users" />

            <div className="fixed-title">
                <div style={{ marginLeft: "10px" }}>
                    <h3>{instructorData?.firstName +' '+instructorData?.lastName || 'Loading...'}</h3>
                </div>
                <hr />
            <InstructorNavbar activeItem='My Schedule'/>        
                        
            </div>
            <div className="inside-container">
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
            getInstructorSchedule: scheduleAction.getInstructorSchedule,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(InstructorSchedule);
