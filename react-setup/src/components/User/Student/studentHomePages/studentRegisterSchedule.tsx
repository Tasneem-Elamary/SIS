import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Table } from 'reactstrap';
import StudentNavlBar from './studentNavBar';
import RegisterationNavbar from '../../../shared/registerationNavbar';
import studentAction from '../../../../state/actions/student.action';
import './style.scss'
interface AllSchedulesProps {
    getAllSchedules: (studentId: string) => Promise<{ schedules: any[] }>;
    registerSchedules: (studentId: string, schedulesIds: string[]) => Promise<void>;
    // allDeprtments: (studentId: string, schedulesIds: string[]) => Promise<DepartmentType[]>;
}

const RegisterSchedule = ({ getAllSchedules, registerSchedules }: AllSchedulesProps) => {
    const [schedules, setSchedules] = useState<any[]>([]);
    const [fetchedSchedules, setFetchedSchedules] = useState<any[]>([]);
    const [times, setTimes] = useState<string[]>([]);
    const [registeredSchedules, setRegisteredSchedules] = useState<string[]>([]);
    const [levelsDropDownOpen, setLevelsDropDownOpen] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState<string|number>('All');
     const levels =['All',1,2,3,4]
    const navigate = useNavigate();
    const studentId = localStorage.getItem('id');

    useEffect(() => {
        const fetchAllSchedule = async () => {
            try {
                const id = localStorage.getItem('id');
                const { schedules } = await getAllSchedules(id!);

                if (!Array.isArray(schedules)) {
                    console.error('Schedules is not an array:', schedules);
                    return;
                }

                const uniqueTimes = Array.from(new Set(schedules.map((schedule: any) => {
                    return `${schedule.Slot.startTime.slice(0, 5)} - ${schedule.Slot.endTime.slice(0, 5)}`;
                })));

                setTimes(uniqueTimes.sort());
                setFetchedSchedules(schedules)
                setSchedules(schedules);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        fetchAllSchedule();
    }, [getAllSchedules]);
    const handleSelectLevel=(level:(number|string))=>{
        if (level !== 'All') {
            const filteredSchedules = fetchedSchedules?.filter((schedule) => {
                const isLevelMatch = schedule?.level === level;
                console.log("Filter check", schedule, schedule.level);
                return isLevelMatch; 
            });
            setSchedules(filteredSchedules); 
        } else {
            setSchedules(fetchedSchedules); 
        }
        
setSelectedLevel(level)
    }
    const handleCheckboxChange = (scheduleId: string) => {
        if (registeredSchedules.includes(scheduleId)) {
            setRegisteredSchedules(registeredSchedules.filter(id => id !== scheduleId));
        } else {
            setRegisteredSchedules([...registeredSchedules, scheduleId]);
        }
        console.log("Current registeredSchedules:", registeredSchedules);
    };

    const handleConfirmRegistration = async () => {
        if (studentId != null) {
            console.log("Sending scheduleIds:", registeredSchedules);
            await registerSchedules(studentId, registeredSchedules);
        } else {
            console.log("Failed to get student id");
        }
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
        if (schedules.length === 0) return null;

        return (
            <ul>
                {schedules.map((schedule) => (
                    <li key={schedule.id}>
                        <div className='black-bold'>
                            <Input type="checkbox" onChange={() => handleCheckboxChange(schedule.id)} />
                        </div>
                        <div className='black-bold'>
                            <span className='blue-bold'>{schedule?.Course?.code}</span> - {schedule?.Course?.name}
                        </div>
                        <div className='black-bold'>
                            <span className='blue-bold'>{schedule?.Room?.code}</span>
                        </div>
                        <div className='blue-bold'>
                            {schedule.Instructor.firstName} {schedule?.Instructor?.lastName}
                        </div>
                        <div className='blue-bold'>
                           <span className='black-bold'>Group: </span>  {schedule?.Group.groupCode}<span className='black-bold'>| Section:</span> {schedule?.Section?.sectionCode}
                        </div>
                        <div className='black-bold'>{schedule?.scheduleType}</div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="container555">


            <RegisterationNavbar />
            <StudentNavlBar activeItem="Schedule" />
            <div className='title'>
                <h4>Register schedule</h4>
<hr />
<div className='inline-items'>
              
                    {/* <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                        <DropdownToggle caret>Department</DropdownToggle>
                        <DropdownMenu>
                            {departments.map((dept, index) => (
                                <DropdownItem key={index} onClick={() => setSelectedDepartment(dept)}>
                                    {dept}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown> */}
              
                    <Dropdown isOpen={levelsDropDownOpen} toggle={() => setLevelsDropDownOpen(!levelsDropDownOpen)}>
                    <DropdownToggle  color="primary" caret>{selectedLevel === 'All' ? 'All levels' :`Level ${selectedLevel}`}</DropdownToggle>
                    <DropdownMenu>
                            {levels.map((level, index) => (
                                <DropdownItem key={index} onClick={() => handleSelectLevel(level)}>
                                    {level}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Button color='primary' className='confirm-button' onClick={handleConfirmRegistration}>
                    Confirm registration
                </Button>
                </div>
            </div>


            <div className="schedule-container">
                <Table bordered striped className='schedule' >
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

        </div>
    );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            getAllSchedules: studentAction.getRegisterScheduleAction,
            registerSchedules: studentAction.registerSchedulesAction,
        },
        dispatch
    );
};

export default connect(null, mapDispatchToProps)(RegisterSchedule);
